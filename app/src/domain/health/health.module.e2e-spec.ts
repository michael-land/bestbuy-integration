import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { agent } from 'supertest';
import { afterAll, beforeAll, describe, it } from 'vitest';
import { HealthModule } from './health.module.js';
import { HealthService } from './health.service.js';

describe('HealthModule', () => {
  let app: INestApplication;
  const healthService: HealthService = { status: () => 'OK' };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HealthModule],
    })
      .overrideProvider(HealthService)
      .useValue(healthService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET health`, async () => {
    await new agent(app.getHttpServer()).get('/health').expect(200).expect(healthService.status());
  });
});
