import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { BestbuyApi } from '../../bestbuy.api.js';
import { DatabaseModule } from '../../database/database.module.js';
import { LarkSdk } from '../../lark.sdk.js';
import { CatalogGetProcessor } from './catalog-get.processor.js';
import { CatalogGetQueue, CatalogGetQueueOptions } from './catalog-get.queue.js';
import { CatalogResolver } from './catalog.resolver.js';
import { CatalogService } from './catalog.service.js';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: CatalogGetQueue.name,
      ...CatalogGetQueueOptions,
    }),
  ],
  providers: [CatalogService, CatalogResolver, BestbuyApi, CatalogGetProcessor, LarkSdk],
})
export class CatalogModule {}
