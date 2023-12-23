import './app-graphql.register.js';

import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bullmq';
import { Module, type OnApplicationShutdown, type OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import type { AppRequestContext } from './app-context.js';
import { AppExceptionFilter } from './app-exception.filter.js';
import { AppThrottlerGuard } from './app-throttle.guard.js';
import { AuthGuard } from './domain/auth/auth.guard.js';
import { AuthModule } from './domain/auth/auth.module.js';
import { HealthModule } from './domain/health/health.module.js';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get('NODE_ENV') === 'production'
          ? {
              forRoutes: [],
              pinoHttp: {
                level: 'info',
                formatters: {
                  level: (label) => ({ level: label }),
                },
                base: undefined,
              },
            }
          : {
              forRoutes: [],
              pinoHttp: {
                level: 'debug',
                transport: {
                  target: 'pino-pretty',
                  options: {
                    translateTime: 'SYS:HH:MM:ss',
                    // hideObject: true,
                    messageFormat: '{if context}[{context}] {end}{msg}',
                    ignore: 'pid,hostname,context',
                  },
                },
              },
            },
    }),

    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 2000,
      },
    ]),

    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          username: config.get('REDIS_USERNAME'),
          password: config.get('REDIS_PASSWORD'),
          family: config.get('REDIS_HOST') === 'redis.railway.internal' ? 6 : undefined,
        },
      }),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({ req, res }: AppRequestContext) => ({ req, res }),
      sortSchema: true,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
    }),

    AuthModule,
    HealthModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AppThrottlerGuard },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: AppExceptionFilter },
  ],
})
export class AppModule implements OnModuleInit, OnApplicationShutdown {
  onModuleInit() {}

  onApplicationShutdown(signal?: string | undefined) {
    console.error(signal);
  }
}
