import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor() {}
  status(): string {
    return 'OK';
  }
}
