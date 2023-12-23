import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { HealthResolver } from './health.resolver.js';
import { HealthService } from './health.service.js';
import { HealthServiceMock } from './health.service.mock.js';

describe('HealthResolver', () => {
  let resolver: HealthResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [HealthResolver, { provide: HealthService, useClass: HealthServiceMock }],
    }).compile();

    resolver = moduleRef.get<HealthResolver>(HealthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('status', () => {
    it('should return OK', async () => {
      expect(await resolver.health()).toBe('OK');
    });
  });
});
