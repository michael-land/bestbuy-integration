import { Injectable, type ContextType, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext, type GqlContextType } from '@nestjs/graphql';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { SKIP_AUTH_KEY } from './auth.decorator.js';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  override canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    return super.canActivate(context);
  }

  override getRequest(context: ExecutionContext) {
    switch (context.getType<ContextType | GqlContextType>()) {
      case 'graphql': {
        return GqlExecutionContext.create(context).getContext().req;
      }
      case 'http': {
        return context.switchToHttp().getRequest();
      }
      default: {
        throw new Error('Unhandled ContextType');
      }
    }
  }
}
