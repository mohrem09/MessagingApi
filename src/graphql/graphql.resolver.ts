import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GraphqlResolver {
  @Query(() => String)
  async result(): Promise<string> {
    return 'ok';
  }
}
