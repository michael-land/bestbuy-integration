import { type SSTConfig } from 'sst';
import { scheduler } from './main.js';

export default {
  config: async () => ({
    name: 'bestbuy',
    region: 'us-east-1',
  }),

  stacks: async (app) => {
    app.setDefaultFunctionProps({ runtime: 'nodejs18.x' });

    if (app.stage !== 'production') {
      app.setDefaultRemovalPolicy('destroy');
    }

    app.stack(scheduler, { stackName: `${app.name}-${app.stage}-scheduler` });
  },
} satisfies SSTConfig;
