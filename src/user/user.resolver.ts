import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.model';
import { MemoryService } from '../memory/memory.service';
import { v4 as uuidv4 } from 'uuid';
import { Conversation } from '../conversation/conversation.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private memoryService: MemoryService) {}

  @Query(() => [Conversation])
  async getUserConversations(@Args('userId', { type: () => String }) userId: string): Promise<Conversation[]> {
    const user = this.memoryService.users.find(user => user.id === userId);
    return user ? user.conversations : [];
  }

  @Mutation(() => User)
  async createUser(
    @Args('email', { type: () => String }) email: string,
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<User> {
    const newUser: User = {
      id: uuidv4(),
      email,
      username,
      password,
      conversations: [],
      messages: [],
    };

    this.memoryService.users.push(newUser);
    return newUser;
  }
}




