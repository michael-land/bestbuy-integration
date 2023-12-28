import * as Types from './operation.js';

const BestbuyCatalogRefreshManyDocument = `
    mutation bestbuyCatalogRefreshMany($input: BestbuyCatalogRefreshManyInput!) {
  bestbuyCatalogRefreshMany(input: $input)
}
    `;
type Requester<C = {}> = <R, V>(doc: string, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>;

export class EvotockSdkCore<C> {
  constructor(private readonly requester: Requester<C>) {}
  bestbuyCatalogRefreshMany = (
    variables: Types.BestbuyCatalogRefreshManyMutationVariables,
    options?: C
  ): Promise<Types.BestbuyCatalogRefreshManyMutation> => {
    return this.requester<Types.BestbuyCatalogRefreshManyMutation, Types.BestbuyCatalogRefreshManyMutationVariables>(
      BestbuyCatalogRefreshManyDocument,
      variables,
      options
    ) as Promise<Types.BestbuyCatalogRefreshManyMutation>;
  };
}
