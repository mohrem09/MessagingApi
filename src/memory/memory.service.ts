import { Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import { Conversation } from '../conversation/conversation.model';
import { Message } from '../message/message.model';

@Injectable()
export class MemoryService {
  users: User[] = [];
  conversations: Conversation[] = [];
  messages: Message[] = [];
}
