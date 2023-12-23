import { Controller, Get } from '@nestjs/common';
import { SkipAuth } from '../auth/auth.decorator.js';
import { HealthService } from './health.service.js';

@Controller('health')
export class HealthController {
  /* c8 ignore next */
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @SkipAuth()
  async status(): Promise<string> {
    return this.healthService.status();
  }
}
