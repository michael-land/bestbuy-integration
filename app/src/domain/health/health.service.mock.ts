import { Injectable } from '@nestjs/common';
import { vi } from 'vitest';
import type { HealthService } from './health.service.js';

@Injectable()
export class HealthServiceMock implements HealthService {
  status = vi.fn<[], string>(() => 'OK');
}
