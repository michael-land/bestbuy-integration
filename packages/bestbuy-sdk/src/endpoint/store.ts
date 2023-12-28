import type { KyInstance } from 'ky';
import type { BestbuyPaginationResponse } from '../types.js';

export class BestbuyStoreApi {
  constructor(private readonly http: KyInstance) {}

  async search(input?: BestbuyStoreSearchCommandInput) {
    const pathname = input ? `stores(${input})` : 'stores';
    return this.http.get(pathname, {
      searchParams: { show: 'all' },
    }).json<BestbuyStoreSearchCommandOutput>;
  }
}

export type BestbuyStoreSearchCommandInput = string;
export type BestbuyStoreSearchCommandOutput = BestbuyPaginationResponse<{
  stores: Array<BestbuyStore>;
}>;
export interface BestbuyStore {
  storeId: number;
  storeType: string;
  locationType: string;
  tradeIn: any;
  brand: any;
  name: string;
  longName: string;
  address: string;
  address2: string;
  city: string;
  region: string;
  fullPostalCode: string;
  country: string;
  lat?: number;
  lng?: number;
  hours: string;
  hoursAmPm: string;
  gmtOffset: number;
  language: any;
  services: Array<{
    service: string;
  }>;
  phone: string;
  postalCode: string;
  detailedHours: Array<{
    day: string;
    date: string;
    open: string;
    close: string;
  }>;
  detailedCurbsideHours: Array<{
    day: string;
    date: string;
    open: string;
    close: string;
  }>;
}
