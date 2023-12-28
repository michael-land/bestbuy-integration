// eslint-disable-next-line node/no-unpublished-import
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './node_modules/@evotock/sdk-schema/schema.graphql',
  documents: ['document/**/*.gql'],

  hooks: {
    afterAllFileWrite: [
      // DO NOT EXPORT FragmentDocument and Document
      `sed -i '' 's/export const \\(.*FragmentDoc\\)/const \\1/'`,
      `sed -i '' 's/export const \\(.*Document\\)/const \\1/'`,
      `sed -i '' 's/export type Sdk = ReturnType<typeof getSdk>;//'`,
      `sed -i '' 's/return requester</return this.requester</'`,
      `sed -i '' 's/    },/    }/'`,
      `sed -i '' 's/export type Requester<C = {}, E = unknown>/type Requester<C = {}>/'`,
      // begin change to array function
      `sed -i '' 's/^[[:blank:]]*\\(.*\\)(variables/\\1 = (variables/'`,
      `sed -i '' 's/Promise<\\(.*\\)> {/Promise<\\1> => {/'`,
      // end change to array function
      `sed -i '' 's/export function getSdk<C, E>(requester: Requester<C, E>) {/\\nexport class EvotockSdkCore<C> {/'`,
      `sed -i '' 's/return {/constructor(private readonly requester: Requester<C>) {}/'`,
      `sed -i '' 's/  };//'`,
      'prettier --write',
    ],
  },
  config: {
    skipTypename: true,
    strictScalars: true,
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
    'src/operation.ts': {
      preset: 'import-types',
      presetConfig: {
        typesPath: '@evotock/sdk-schema',
        importTypesNamespace: 'Types',
      },
      plugins: ['typescript-operations'],
    },
    'src/sdk.ts': {
      preset: 'import-types',
      presetConfig: {
        typesPath: './operation.js',
        importTypesNamespace: 'Types',
      },
      config: {
        documentMode: 'string',
        dedupeFragments: true,
      },
      plugins: ['typescript-generic-sdk'],
    },
  },
};

export default config;
