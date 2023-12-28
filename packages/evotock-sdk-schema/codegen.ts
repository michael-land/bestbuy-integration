// eslint-disable-next-line node/no-unpublished-import
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    [`http://localhost:5002/graphql`]: {},
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  config: {
    defaultScalarType: 'unknown',
    skipTypename: true,
    dedupeFragments: true,
    strictScalars: true,
    enumsAsTypes: true,
    avoidOptionals: {
      field: true,
    },
    scalars: {
      ID: 'string',
      String: 'string',
      Boolean: 'boolean',
      Int: 'number',
      Float: 'number',
      Date: 'Date',
      DateTime: { input: 'Date | string', output: 'string' },
      NonNegativeFloat: 'number',
      NonNegativeInt: 'number',
      NonPositiveFloat: 'number',
      NonPositiveInt: 'number',
    },
  },

  generates: {
    'schema.graphql': {
      plugins: ['schema-ast'],
    },
    'src/index.ts': {
      plugins: ['typescript'],
    },
  },
};

export default config;
