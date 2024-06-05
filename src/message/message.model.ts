import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Conversation } from '../conversation/conversation.model';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field()
  timestamp: Date;

  @Field(() => User)
  sender: User;

  @Field(() => Conversation)
  conversation: Conversation;
}
