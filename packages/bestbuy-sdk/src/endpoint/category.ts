import type { KyInstance } from 'ky';
import type { BestbuyPaginationResponse } from '../types.js';

export class BestbuyCategoryApi {
  constructor(private readonly http: KyInstance) {}

  async search(input?: BestbuyCategorySearchCommandInput) {
    const pathname = input ? `categories(${input})` : 'categories';
    return this.http.get(pathname).json<BestbuyCategorySearchCommandOutput>;
  }
}

export type BestbuyCategorySearchCommandInput = string;
export type BestbuyCategorySearchCommandOutput = BestbuyPaginationResponse<{
  categories: Array<BestbuyCategory>;
}>;

export interface BestbuyCategory {
  id: string;
  name: string;
  active: boolean;
  url: string;
  path: Array<{
    id: string;
    name: string;
  }>;
  subCategories: Array<{
    id: string;
    name: string;
  }>;
}
