import { EvotockSdk } from '@evotock/sdk';
import { Config } from 'sst/node/config';

const evotockApi = new EvotockSdk({
  endpoint: Config.EVOTOCK_GRAPHQL_ENDPOINT,
  token: Config.EVOTOCK_GRAPHQL_TOKEN,
});

export async function main() {
  await evotockApi.bestbuyCatalogRefreshMany({
    input: {},
  });
}
