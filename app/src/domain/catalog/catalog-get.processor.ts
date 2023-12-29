import type { DB, Insertable, Selectable } from '@evotock/database-schema';
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
      const catalog = await this.database
        .selectFrom('catalog')
        .where('marketplaceId', '=', 'db9a93b2-e306-4910-93ab-4a467ea87b60')
        .where('externalId', '=', job.data.sku)
        .selectAll()
        .executeTakeFirstOrThrow();

      const data = await this.bestbuy.product.search(`sku=${job.data.sku}`);
      const product = data.products.at(0);
      if (!product) {
        await this.database
          .updateTable('catalog')
          .where('id', '=', catalog.id)
          .set({ status: 'DELETED' })
          .executeTakeFirstOrThrow();
      } else {
        await this.database.transaction().execute(async (transaction) => {
          await transaction
            .updateTable('catalog')
            .where('id', '=', catalog.id)
            .set({
              name: catalog.name,
              packageQuantity: 1,
              category: product.class,
              status: 'ACTIVE',
              type: product.type === 'Bundle' ? 'BUNDLE' : catalog.type ? 'STANDARD' : 'UNKNOWN',
            })
            .executeTakeFirstOrThrow();

          const nextCatalogImages = product.images.map((image, imageIdx) => ({
            catalogId: catalog.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            url: image.href,
            height: Number(image.height),
            width: Number(image.width),
            position: imageIdx,
          }));

          await transaction
            .insertInto('catalogImage')
            .values(nextCatalogImages)
            .onConflict((eb) => eb.doNothing())
            .execute();

          const prevCatalogOffers = await transaction
            .selectFrom('catalogOffer')
            .selectAll()
            .where('deletedAt', 'is', null)
            .where('catalogId', '=', catalog.id)
            .where('customerType', '=', 'CONSUMER')
            .where('condition', '=', 'NEW')
            .execute();

          const nextCatalogOffers: Insertable<DB['catalogOffer']>[] =
            product.inStoreAvailability || product.onlineAvailability
              ? [
                  {
                    catalogId: catalog.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    itemPrice: new Decimal(product.salePrice ?? product.regularPrice).times(100).round().toNumber(),
                    shipPrice: product.shippingLevelsOfService.length
                      ? new Decimal(product.shippingCost ?? 0).times(100).round().toNumber()
                      : 0,
                    customerType: 'CONSUMER',
                    condition: 'NEW',
                    type: 'REGULAR',
                    fulfillmentChannel: 'PLATFORM',
                    merchantId: 'ac0cb587-8525-4161-a635-d67b268eba94',
                    position: 0,
                    prime: 'NONE',
                    fulfillmentHourMin: null,
                    fulfillmentHourMax: null,
                    fulfillmentCountry: 'USA',
                    subcondition: 'NEW',
                    restockAt: null,
                    fulfillmentProvince: null,
                  },
                ]
              : [];

          const removedOffers = findRemovedCatalogOffers({ prevCatalogOffers, nextCatalogOffers });
          const unsavedOffers = findUnsavedCatalogOffers({ prevCatalogOffers, nextCatalogOffers });

          if (removedOffers.length) {
            await transaction
              .updateTable('catalogOffer')
              .set({ deletedAt: new Date() })
              .where('id', 'in', removedOffers.map((offer) => offer.id).filter(Boolean))
              .execute();
          }

          if (unsavedOffers.length) {
            await transaction
              .insertInto('catalogOffer')
              .values(unsavedOffers)
              .onConflict((qb) => qb.doNothing())
              .returning('id')
              .execute();
          }
        });

        const tracker = await this.database
          .selectFrom('catalogTracker')
          .where('catalogId', '=', catalog.id)
          .where('teamId', '=', 'df379e65-b542-4c78-a6d4-cd39f9608bef')
          .selectAll()
          .executeTakeFirstOrThrow();

        const itemPrice = new Decimal(product.salePrice ?? product.regularPrice).times(100).round().toNumber();
        if ((!tracker.noticedAt || !isToday(tracker.noticedAt)) && tracker.price && itemPrice < tracker.price) {
          console.log(`${product.sku} is available to purchase for ${itemPrice}`);

          const response = await this.lark.im.message.createByCard({
            data: {
              receive_id: 'oc_4e496062eb44f39ae964ec42da81fecb',
              template_id: 'ctp_AAyt469SXpGG',
              template_variable: {
                product_name: catalog.name,
                product_price: `$${product.salePrice ?? product.regularPrice}`,
                product_link: catalog.externalUrl,
                platform_name: 'Bestbuy',
              },
            },
            params: {
              receive_id_type: 'chat_id',
            },
          });

          if (response.code === 0) {
            await this.database
              .updateTable('catalogTracker')
              .where('id', '=', tracker.id)
              .set({ noticedAt: new Date() })
              .executeTakeFirstOrThrow();
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new UnrecoverableError(error.message);
      } else {
        throw error;
      }
    }
  }
}

function findUnsavedCatalogOffers({
  nextCatalogOffers,
  prevCatalogOffers,
}: {
  prevCatalogOffers: Selectable<DB['catalogOffer']>[];
  nextCatalogOffers: Insertable<DB['catalogOffer']>[];
}): Insertable<DB['catalogOffer']>[] {
  return nextCatalogOffers.filter(
    (nextCatalogOffer) =>
      !prevCatalogOffers.some((prevCatalogOffer) => {
        if (!nextCatalogOffer.createdAt) return false;

        return (
          prevCatalogOffer.merchantId === nextCatalogOffer.merchantId &&
          prevCatalogOffer.catalogId === nextCatalogOffer.catalogId &&
          prevCatalogOffer.customerType === nextCatalogOffer.customerType &&
          prevCatalogOffer.condition === nextCatalogOffer.condition &&
          prevCatalogOffer.subcondition === nextCatalogOffer.subcondition &&
          prevCatalogOffer.fulfillmentChannel === nextCatalogOffer.fulfillmentChannel &&
          prevCatalogOffer.itemPrice === nextCatalogOffer.itemPrice &&
          prevCatalogOffer.shipPrice === nextCatalogOffer.shipPrice &&
          prevCatalogOffer.type === nextCatalogOffer.type &&
          prevCatalogOffer.position === nextCatalogOffer.position &&
          prevCatalogOffer.prime === nextCatalogOffer.prime &&
          prevCatalogOffer.fulfillmentCountry === nextCatalogOffer.fulfillmentCountry &&
          prevCatalogOffer.fulfillmentProvince === nextCatalogOffer.fulfillmentProvince &&
          prevCatalogOffer.fulfillmentHourMin === nextCatalogOffer.fulfillmentHourMin &&
          prevCatalogOffer.fulfillmentHourMax === nextCatalogOffer.fulfillmentHourMax
        );
      })
  );
}

function findRemovedCatalogOffers({
  nextCatalogOffers,
  prevCatalogOffers,
}: {
  prevCatalogOffers: Selectable<DB['catalogOffer']>[];
  nextCatalogOffers: Insertable<DB['catalogOffer']>[];
}) {
  return prevCatalogOffers.filter((prevCatalogOffer) => {
    const nextCatalogOffer = nextCatalogOffers.find(
      (nextCatalogOffer) =>
        prevCatalogOffer.merchantId === nextCatalogOffer.merchantId &&
        prevCatalogOffer.catalogId === nextCatalogOffer.catalogId &&
        prevCatalogOffer.condition === nextCatalogOffer.condition &&
        prevCatalogOffer.customerType === nextCatalogOffer.customerType &&
        prevCatalogOffer.subcondition === nextCatalogOffer.subcondition &&
        prevCatalogOffer.fulfillmentChannel === nextCatalogOffer.fulfillmentChannel &&
        prevCatalogOffer.position === nextCatalogOffer.position &&
        prevCatalogOffer.itemPrice === nextCatalogOffer.itemPrice &&
        prevCatalogOffer.shipPrice === nextCatalogOffer.shipPrice &&
        prevCatalogOffer.type === nextCatalogOffer.type
    );

    if (!nextCatalogOffer) return true;

    return (
      prevCatalogOffer.fulfillmentCountry !== nextCatalogOffer.fulfillmentCountry ||
      prevCatalogOffer.fulfillmentProvince !== nextCatalogOffer.fulfillmentProvince ||
      prevCatalogOffer.fulfillmentHourMin !== nextCatalogOffer.fulfillmentHourMin ||
      prevCatalogOffer.fulfillmentHourMax !== nextCatalogOffer.fulfillmentHourMax ||
      prevCatalogOffer.prime !== nextCatalogOffer.prime ||
      prevCatalogOffer.position !== nextCatalogOffer.position
    );
  });
}
