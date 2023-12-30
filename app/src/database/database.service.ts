import { Database } from '@byteroam/database';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService extends Database {
  constructor(readonly config: ConfigService) {
    super({
      config: {
        connectionString: config.getOrThrow('POSTGRES_URL'),
        ssl: { rejectUnauthorized: false },
        application_name: 'Bestbuy Integration',
      },
    });
  }
}
