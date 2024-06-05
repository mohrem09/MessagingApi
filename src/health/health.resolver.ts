import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class HealthResolver {
  @Query(() => String)
  result(): string {
    return 'ok';
  }
}
