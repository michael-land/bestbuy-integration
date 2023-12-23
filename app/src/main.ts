import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { setTimeout } from 'timers/promises';
import { AppModule } from './app.module.js';

// ensure railway private URL is ready
await setTimeout(3000);

const app = await NestFactory.create(AppModule, {
  bufferLogs: true,
});

const config = app.get(ConfigService);
const logger = app.get(Logger);

app.useLogger(logger);

if (config.getOrThrow('NODE_ENV') === 'production') {
  app.enableShutdownHooks();
  app.getHttpAdapter().getInstance().disable('x-powered-by');
}

const host = config.getOrThrow('NODE_ENV') === 'production' ? '0.0.0.0' : 'localhost';
const port = config.getOrThrow<string>('PORT');

await app.listen(port);

console.log(`🚀 ready at ${host}:${port}`);
