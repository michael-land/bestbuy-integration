import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { HealthService } from './health.service.js';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    service = moduleRef.get<HealthService>(HealthService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('status', () => {
    it('should return OK', () => {
      expect(service.status()).toBe('OK');
    });
  });
});
