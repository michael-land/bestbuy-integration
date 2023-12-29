import { seconds } from '@evotock/utilities';
import { Job, Queue, Worker, type QueueOptions, type WorkerOptions } from 'bullmq';
import type { LiteralUnion } from 'type-fest';

export interface CatalogGetJobInput {
  readonly sku: string;
  readonly marketplace: { id: string; externalId: string };
}

export interface CatalogGetJobOutput {}

export type CatalogGetJobName = LiteralUnion<'schedule' | 'manual', string>;

export class CatalogGetJob extends Job<CatalogGetJobInput, CatalogGetJobOutput, CatalogGetJobName> {}
export class CatalogGetQueue extends Queue<CatalogGetJobInput, CatalogGetJobOutput, CatalogGetJobName> {}

export const CatalogGetQueueOptions: QueueOptions = {
  prefix: 'bestbuy',
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 3000,
    },
    removeOnComplete: true,
  },
};

export class CatalogGetWorker extends Worker<CatalogGetJobInput, CatalogGetJobOutput, CatalogGetJobName> {}
export const CatalogGetWorkerOptions: WorkerOptions = {
  prefix: 'bestbuy',
  limiter: { duration: seconds(1), max: 1 },
  concurrency: 2,
};
