import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BestbuyCatalogRefreshManyInput {
  @Field(() => [String], { nullable: true })
  readonly marketplaceIds?: string[];

  @Field(() => [String], { nullable: true })
  readonly skus?: string[];
}
