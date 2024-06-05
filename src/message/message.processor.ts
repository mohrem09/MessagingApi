import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MemoryService } from '../memory/memory.service';
import { Message } from './message.model';

@Processor('message-queue')
export class MessageProcessor {
  constructor(private memoryService: MemoryService) {}

  @Process('send-message')
  async handleSendMessage(job: Job<any>) {
    const { id, content, timestamp, senderId, conversationId } = job.data;
    console.log('Processing message:', job.data);

    const sender = this.memoryService.users.find(user => user.id === senderId);
    const conversation = this.memoryService.conversations.find(conv => conv.id === conversationId);

    if (!sender || !conversation) {
      console.error('Sender or conversation not found');
      return;
    }

    const newMessage: Message = {
      id,
      content,
      timestamp: new Date(timestamp),
      sender,
      conversation,
    };

    this.memoryService.messages.push(newMessage);
    conversation.messages.push(newMessage);
    sender.messages.push(newMessage);
  }
}


