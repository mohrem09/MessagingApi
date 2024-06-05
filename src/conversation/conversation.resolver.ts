import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Conversation } from './conversation.model';
import { Message } from '../message/message.model';
import { User } from '../user/user.model';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { v4 as uuidv4 } from 'uuid';
import { MemoryService } from '../memory/memory.service';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(
    @InjectQueue('message-queue') private messageQueue: Queue,
    private memoryService: MemoryService
  ) {}

  @Query(() => [Message])
  async getConversationMessages(@Args('conversationId') conversationId: string): Promise<Message[]> {
    const conversation = this.memoryService.conversations.find(conv => conv.id === conversationId);
    return conversation ? conversation.messages : [];
  }

  @Mutation(() => Conversation)
  async createConversation(
    @Args('title', { type: () => String }) title: string,
    @Args('participantIds', { type: () => [String] }) participantIds: string[],
  ): Promise<Conversation> {
    const participants: User[] = participantIds.map(id => {
      const user = this.memoryService.users.find(user => user.id === id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      return user;
    });

    const newConversation: Conversation = {
      id: uuidv4(),
      title,
      participants,
      messages: [],
    };

    this.memoryService.conversations.push(newConversation);
    participants.forEach(user => user.conversations.push(newConversation));
    return newConversation;
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('conversationId', { type: () => String }) conversationId: string,
    @Args('senderId', { type: () => String }) senderId: string,
    @Args('content', { type: () => String }) content: string,
  ): Promise<Message> {
    const conversation = this.memoryService.conversations.find(conv => conv.id === conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const sender = this.memoryService.users.find(user => user.id === senderId);
    if (!sender) {
      throw new Error('Sender not found');
    }

    const newMessage: Message = {
      id: uuidv4(),
      content,
      timestamp: new Date(),
      sender,
      conversation,
    };

    // Créer une version simplifiée du message sans références circulaires
    const simpleMessage = {
      id: newMessage.id,
      content: newMessage.content,
      timestamp: newMessage.timestamp,
      senderId: newMessage.sender.id,
      conversationId: newMessage.conversation.id,
    };

    await this.messageQueue.add('send-message', simpleMessage);
    conversation.messages.push(newMessage);
    sender.messages.push(newMessage);
    return newMessage;
  }
}





