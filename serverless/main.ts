import { Api, ApiRouteProps, Config, Cron, type StackContext } from 'sst/constructs';

const crons: {
  function: string;
  schedule: `rate(${string})` | `cron(${string})` | undefined;
  route: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'ANY';
    path: string;
  };
}[] = [
  {
    function: 'catalog-refresh',
    schedule: 'rate(5 minutes)',
    route: { method: 'POST', path: '/catalog-refresh-new' },
  },
];

export async function Bestbuy({ stack }: StackContext) {
  const EVOTOCK_GRAPHQL_ENDPOINT = new Config.Secret(stack, 'EVOTOCK_GRAPHQL_ENDPOINT');
  const EVOTOCK_GRAPHQL_TOKEN = new Config.Secret(stack, 'EVOTOCK_GRAPHQL_TOKEN');

  stack.setDefaultFunctionProps({
    bind: [EVOTOCK_GRAPHQL_ENDPOINT, EVOTOCK_GRAPHQL_TOKEN],
    memorySize: 128,
    tracing: 'disabled',
  });

  if (stack.stage === 'production') {
    for (const cron of crons) {
      new Cron(stack, `${cron.function}-cron`, {
        schedule: cron.schedule,
        job: {
          function: {
            handler: `crons/${cron.function}.main`,
            functionName: `${stack.stackName}-${cron.function}-cron`,
          },
        },
      });
    }
  }

  const api = new Api(stack, 'cron-api', {
    routes: Object.fromEntries(
      crons.map<[string, ApiRouteProps<string>]>((cron) => {
        return [
          `${cron.route.method} ${cron.route.path}`,
          {
            function: {
              handler: `crons/${cron.function}.main`,
              functionName: `${stack.stackName}-${cron.function}-cron-api`,
            },
          },
        ];
      })
    ),
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
