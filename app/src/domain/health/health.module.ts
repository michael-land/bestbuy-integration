import { Module } from '@nestjs/common';
import { HealthController } from './health.controller.js';
import { HealthResolver } from './health.resolver.js';
import { HealthService } from './health.service.js';

@Module({
  controllers: [HealthController],
  providers: [HealthResolver, HealthService],
})
export class HealthModule {}
