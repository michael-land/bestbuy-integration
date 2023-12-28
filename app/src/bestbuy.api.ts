import { BestbuySdk } from '@bestbuy/sdk';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BestbuyApi extends BestbuySdk {
  private readonly logger = new Logger(BestbuyApi.name);
  constructor(readonly config: ConfigService) {
    super({
      apiKey: config.getOrThrow('BESTBUY_API_KEY'),
    });
  }
}
