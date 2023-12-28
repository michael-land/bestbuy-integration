import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BestbuyCatalogRefreshManyInput } from './catalog.schema.js';
import { CatalogService } from './catalog.service.js';

@Resolver()
export class CatalogResolver {
  constructor(private readonly catalogService: CatalogService) {}

  @Mutation(() => Boolean)
  async bestbuyCatalogRefreshMany(
    @Args({ name: 'input' })
    input: BestbuyCatalogRefreshManyInput
  ): Promise<boolean> {
    await this.catalogService.refresh(input);
    return true;
  }
}
