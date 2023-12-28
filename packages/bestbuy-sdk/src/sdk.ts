import ky from 'ky';
import { BestbuyCategoryApi } from './endpoint/category.js';
import { BestbuyProductApi } from './endpoint/product.js';
import { BestbuyStoreApi } from './endpoint/store.js';

export class BestbuySdk {
  readonly product: BestbuyProductApi;
  readonly category: BestbuyCategoryApi;
  readonly store: BestbuyStoreApi;

  constructor({ apiKey }: { apiKey: string }) {
    const http = ky.create({
      prefixUrl: 'https://api.bestbuy.com/v1/',
      searchParams: {
        apiKey,
        format: 'json',
      },
    });

    this.product = new BestbuyProductApi(http);
    this.category = new BestbuyCategoryApi(http);
    this.store = new BestbuyStoreApi(http);
  }
}
