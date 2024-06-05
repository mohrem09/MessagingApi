import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';
import { Message } from '../message/message.model';
import { Conversation } from '../conversation/conversation.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(3, 20)
  username: string;

  @Field()
  @Length(6, 30)
  password: string;

  @Field(() => [Conversation])
  conversations: Conversation[];

  @Field(() => [Message])
  messages: Message[];
}
