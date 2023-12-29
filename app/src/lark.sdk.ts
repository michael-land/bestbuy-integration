import { AppType, Client, Domain } from '@larksuiteoapi/node-sdk';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LarkSdk extends Client {
  constructor(readonly config: ConfigService) {
    const logger = new Logger(LarkSdk.name);

    super({
      appId: config.getOrThrow('LARK_APP_ID'),
      appSecret: config.getOrThrow('LARK_APP_SECRET'),
      appType: AppType.SelfBuild,
      domain: Domain.Lark,
      logger: {
        info: logger.log.bind(logger),
        warn: logger.warn.bind(logger),
        error: logger.error.bind(logger),
        debug: logger.debug.bind(logger),
        trace: logger.verbose.bind(logger),
      },
    });
  }
}
