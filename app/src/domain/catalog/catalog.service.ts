import { split } from '@evotock/utilities';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import { CatalogGetQueue } from './catalog-get.queue.js';
import { BestbuyCatalogRefreshManyInput } from './catalog.schema.js';

@Injectable()
export class CatalogService {
  readonly #logger = new Logger(CatalogService.name);

  constructor(
    @InjectQueue(CatalogGetQueue.name)
    private readonly catalogGetQueue: CatalogGetQueue,
    private readonly database: DatabaseService
  ) {}

  async refresh(input: BestbuyCatalogRefreshManyInput) {
    let marketplacesQuery = this.database
      .selectFrom('marketplace')
      .where('platformId', '=', 'e55e4952-6f4e-4f5b-9c77-9469ac766179')
      .selectAll();
    if (input.marketplaceIds) {
      marketplacesQuery = marketplacesQuery.where('externalId', 'in', input.marketplaceIds);
    }
    const marketplaces = await marketplacesQuery.execute();

    for (const marketplace of marketplaces) {
      const catalogs = await this.database
        .selectFrom('catalog')
        .select(['marketplaceId', 'externalId'])
        .where('marketplaceId', '=', marketplace.id)
        .selectAll()
        .execute();

      this.#logger.debug(`${marketplace.name} ${catalogs.length}`);

      for (const chunked of split(catalogs, 100)) {
        await this.catalogGetQueue.addBulk(
          chunked.map((catalog) => ({
            name: 'schedule',
            opts: { jobId: catalog.id },
            data: {
              marketplace: { externalId: marketplace.externalId, id: marketplace.id },
              sku: catalog.externalId,
            },
          }))
        );
      }
    }
  }
}
