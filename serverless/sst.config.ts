import { type SSTConfig } from 'sst';
import { Bestbuy } from './main.js';

export default {
  config: async () => ({
    name: 'evotock',
    region: 'us-east-1',
  }),

  stacks: async (app) => {
    app.setDefaultFunctionProps({ runtime: 'nodejs18.x' });

    if (app.stage !== 'production') {
      app.setDefaultRemovalPolicy('destroy');
    }

    app.stack(Bestbuy, { stackName: `${app.name}-${app.stage}-bestbuy` });
  },
} satisfies SSTConfig;
