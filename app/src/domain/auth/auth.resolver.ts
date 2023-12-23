import { ConfigService } from '@nestjs/config';
import { Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service.js';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService
  ) {}
}
