import { Injectable, type ContextType, type ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext, type GqlContextType } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';
import type { Request } from 'express';
import type { AppRequestContext } from './app-context.js';

@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  override async getTracker(req: Request): Promise<string> {
    const token = req.headers.authorization?.match(/Bearer (.*)/)?.[1];
    return token ?? req.ip;
  }

  override getRequestResponse(context: ExecutionContext): AppRequestContext {
    switch (context.getType<ContextType | GqlContextType>()) {
      case 'http': {
        return super.getRequestResponse(context) as AppRequestContext;
      }
      case 'graphql': {
        return GqlExecutionContext.create(context).getContext();
      }
      default: {
        throw new Error('[GatewayThrottlerGuard] Unhandled ContextType');
      }
    }
  }
}
