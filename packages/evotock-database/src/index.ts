import type { DB } from '@evotock/database-schema';
import { CamelCasePlugin, Kysely, PostgresDialect, Transaction, type LogConfig } from 'kysely';
import pg from 'pg';
export { Kysely, sql } from 'kysely';

export class EvotockDatabase extends Kysely<DB> {
  constructor({ config, log }: { config: pg.PoolConfig; log?: LogConfig }) {
    super({
      log,
      dialect: new PostgresDialect({ pool: new pg.Pool(config) }),
      plugins: [new CamelCasePlugin({ maintainNestedObjectKeys: true })],
    });
  }
}
export type EvotockDatabaseTransaction = Transaction<DB>;
