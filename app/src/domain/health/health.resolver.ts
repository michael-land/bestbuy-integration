import { Query, Resolver } from '@nestjs/graphql';
import { HealthService } from './health.service.js';

@Resolver()
export class HealthResolver {
  /* c8 ignore next */
  constructor(private readonly healthService: HealthService) {}

  @Query(() => String)
  async health(): Promise<string> {
    return this.healthService.status();
  }
}
