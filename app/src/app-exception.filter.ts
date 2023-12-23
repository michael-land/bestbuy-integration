import { AuthenticationError, UserInputError, ValidationError } from '@nestjs/apollo';
import {
  BadRequestException,
  Catch,
  HttpException,
  Logger,
  NotFoundException,
  UnauthorizedException,
  type ArgumentsHost,
  type ContextType,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { type GqlContextType } from '@nestjs/graphql';
import { ThrottlerException } from '@nestjs/throttler';
import { GraphQLError } from 'graphql';
import type { AppRequestContext } from './app-context.js';

@Catch(HttpException)
export class AppExceptionFilter extends BaseExceptionFilter {
  readonly #logger = new Logger(AppExceptionFilter.name);

  override catch(exception: HttpException, host: ArgumentsHost) {
    switch (host.getType<ContextType | GqlContextType>()) {
      case 'http': {
        return super.catch(exception, host);
      }
      case 'graphql': {
        if (exception instanceof UnauthorizedException) {
          throw new AuthenticationError(exception.message);
        }

        if (exception instanceof ThrottlerException) {
          switch (host.getType<ContextType | GqlContextType>()) {
            case 'graphql': {
              try {
                const gql = host.getArgByIndex(3);
                const ctx = host.getArgByIndex(2) as AppRequestContext;
                const token = ctx.req.headers.authorization?.match(/Bearer (.*)/)?.[1];
                this.#logger.error({ token, path: gql.path }, ThrottlerException.name);
              } catch (error) {
                this.#logger.error(error);
                this.#logger.error(ThrottlerException.name);
              }
              return new GraphQLError('Too Many Request', { extensions: { code: 'RATE_LIMITED' } });
            }
            default: {
              return exception;
            }
          }
        }

        if (exception instanceof BadRequestException) {
          return new UserInputError(
            typeof exception.getResponse() === 'string'
              ? exception.getResponse()
              : (exception.getResponse() as Record<string, any>)['message']
          );
        }
        if (exception instanceof NotFoundException) {
          return new ValidationError(exception.message);
        }
        return exception;
      }
      default: {
        throw new Error('[GatewayThrottlerGuard] Unhandled ContextType');
      }
    }
  }
}
