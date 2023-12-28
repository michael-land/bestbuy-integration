export * from './operation.js';

import ky, { type Options } from 'ky';
import { EvotockSdkCore } from './sdk.js';

export class EvotockSdk extends EvotockSdkCore<Options> {
  constructor({ endpoint, token }: { endpoint: string; token: string }) {
    const http = ky.create({
      prefixUrl: endpoint,
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    });

    super(async (query, variables, options) => {
      const response = await http('graphql', {
        ...options,
        method: 'POST',
        json: { query, variables },
      });
      const result = (await response.json()) as { data?: any; errors?: any };

      if (result.errors) {
        throw result.errors[0];
      } else {
        return result.data;
      }
    });
  }
}
