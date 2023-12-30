import { BestbuySdkHTTPError } from '@bestbuy/sdk';
import {
  CatalogImagesMergeCommand,
  CatalogOffersMergeCommand,
  CatalogTrackerSetNoticedAtCommand,
} from '@byteroam/database';
import type { DB, Insertable } from '@byteroam/database-schema';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { UnrecoverableError, Worker } from 'bullmq';
import { isToday } from 'date-fns';
import { Decimal } from 'decimal.js';
import { BestbuyApi } from '../../bestbuy.api.js';
import { DatabaseService } from '../../database/database.service.js';
import { LarkSdk } from '../../lark.sdk.js';
import {
  CatalogGetJob,
  CatalogGetQueue,
  CatalogGetWorkerOptions,
  type CatalogGetJobInput,
  type CatalogGetJobName,
  type CatalogGetJobOutput,
} from './catalog-get.queue.js';

@Processor(CatalogGetQueue.name, CatalogGetWorkerOptions)
export class CatalogGetProcessor extends WorkerHost<
  Worker<CatalogGetJobInput, CatalogGetJobOutput, CatalogGetJobName>
> {
  #logger = new Logger(CatalogGetProcessor.name);

  constructor(
    private readonly database: DatabaseService,
    private readonly bestbuy: BestbuyApi,
    private readonly lark: LarkSdk
  ) {
    super();
  }

  @OnWorkerEvent('failed')
  onFailed(job: CatalogGetJob) {
    this.#logger.error(
      {
        jobProcessedAt: job.processedOn ? new Date(job.processedOn).toISOString() : undefined,
        jobCompletedAt: job.finishedOn ? new Date(job.finishedOn).toISOString() : undefined,
        jobInput: job.data,
        jobOutput: job.returnvalue,
        jobQueueName: job.queueName,
        jobId: job.id,
        jobName: job.name,
        jobToken: job.token,
      },
      job.failedReason
    );
  }

  override async process(job: CatalogGetJob) {
    this.#logger.log(`processing bestbuy catalog get job ${job.data.sku}`);

    try {
      const data = await this.bestbuy.product.search(`sku=${job.data.sku}`);

      const product = data.products.at(0);

      if (!product) {
        await this.database
          .updateTable('catalog')
          .where('externalId', '=', job.data.sku)
          .where('marketplaceId', '=', 'db9a93b2-e306-4910-93ab-4a467ea87b60')
          .set({ status: 'DELETED' })
          .executeTakeFirstOrThrow();
      } else {
        const prevCatalog = await this.database
          .selectFrom('catalog')
          .where('marketplaceId', '=', 'db9a93b2-e306-4910-93ab-4a467ea87b60')
          .where('externalId', '=', job.data.sku)
          .selectAll()
          .executeTakeFirstOrThrow();

        const nextCatalog = {
          // immutable
          externalId: `${product.sku}`,
          externalUrl: `https://www.bestbuy.com/site/${product.sku}.p`,
          marketplaceId: 'db9a93b2-e306-4910-93ab-4a467ea87b60',
          packageQuantity: 1,
          status: 'ACTIVE',
          // updatable
          name: product.name,
          category: product.class,
          createdAt: product.startDate,
          updatedAt: new Date(),
          type: product.type === 'Bundle' ? 'BUNDLE' : prevCatalog.type ? 'STANDARD' : 'UNKNOWN',
        } satisfies Insertable<DB['catalog']>;

        await this.database.transaction().execute(async (transaction) => {
          if (prevCatalog.name !== nextCatalog.name || nextCatalog.category !== prevCatalog.category) {
            await transaction
              .updateTable('catalog')
              .where('id', '=', prevCatalog.id)
              .set(nextCatalog)
              .executeTakeFirstOrThrow();
          }

          const prevCatalogImages = await transaction
            .selectFrom('catalogImage')
            .selectAll()
            .where('catalogId', '=', prevCatalog.id)
            .execute();

          const nextCatalogImages = product.images.map((image, imageIdx) => ({
            catalogId: prevCatalog.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            url: image.href,
            height: Number(image.height),
            width: Number(image.width),
            position: imageIdx,
          })) satisfies Insertable<DB['catalogImage']>[];

          await new CatalogImagesMergeCommand({
            nextCatalogImages,
            prevCatalogImages,
          }).execute(transaction);

          const prevCatalogOffers = await transaction
            .selectFrom('catalogOffer')
            .selectAll()
            .where('deletedAt', 'is', null)
            .where('catalogId', '=', prevCatalog.id)
            .where('customerType', '=', 'CONSUMER')
            .where('condition', '=', 'NEW')
            .execute();

          const nextCatalogOffers: Insertable<DB['catalogOffer']>[] =
            product.inStoreAvailability || product.onlineAvailability
              ? [
                  {
                    // immutable
                    catalogId: prevCatalog.id,
                    condition: 'NEW',
                    createdAt: new Date(),
                    customerType: 'CONSUMER',
                    fulfillmentChannel: 'PLATFORM',
                    fulfillmentCountry: 'USA',
                    fulfillmentHourMax: null,
                    fulfillmentHourMin: null,
                    fulfillmentProvince: null,
                    merchantId: 'ac0cb587-8525-4161-a635-d67b268eba94',
                    position: 0,
                    prime: 'NONE',
                    restockAt: null,
                    subcondition: 'NEW',
                    type: 'REGULAR',
                    updatedAt: new Date(),

                    // updatable
                    itemPrice: new Decimal(product.salePrice ?? product.regularPrice).times(100).round().toNumber(),
                    shipPrice: product.shippingLevelsOfService.length
                      ? new Decimal(product.shippingCost ?? 0).times(100).round().toNumber()
                      : 0,
                  },
                ]
              : [];

          await new CatalogOffersMergeCommand({
            prevCatalogOffers,
            nextCatalogOffers,
          }).execute(transaction);
        });

        const tracker = await this.database
          .selectFrom('catalogTracker')
          .where('catalogId', '=', prevCatalog.id)
          .where('teamId', '=', 'df379e65-b542-4c78-a6d4-cd39f9608bef')
          .selectAll()
          .executeTakeFirstOrThrow();

        const itemPrice = new Decimal(product.salePrice ?? product.regularPrice).times(100).round().toNumber();
        if ((!tracker.noticedAt || !isToday(tracker.noticedAt)) && tracker.priceMax && itemPrice < tracker.priceMax) {
          console.log(`${product.sku} is available to purchase for ${itemPrice}`);

          const response = await this.lark.im.message.createByCard({
            data: {
              receive_id: 'oc_4e496062eb44f39ae964ec42da81fecb',
              template_id: 'ctp_AAyt469SXpGG',
              template_variable: {
                product_name: prevCatalog.name,
                product_price: `$${product.salePrice ?? product.regularPrice}`,
                product_link: prevCatalog.externalUrl,
                platform_name: 'Bestbuy',
              },
            },
            params: {
              receive_id_type: 'chat_id',
            },
          });

          if (response.code === 0) {
            await new CatalogTrackerSetNoticedAtCommand({
              id: tracker.id,
            }).execute(this.database);
          }
        }
      }
    } catch (error) {
      if (error instanceof BestbuySdkHTTPError) {
        this.#logger.error(error);
      } else if (error instanceof Error) {
        throw new UnrecoverableError(error.message);
      } else {
        throw error;
      }
    }
  }
}
