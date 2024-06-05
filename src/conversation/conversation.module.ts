import { Module } from '@nestjs/common';
import { ConversationResolver } from './conversation.resolver';
import { BullModule } from '@nestjs/bull';
import { MemoryModule } from '../memory/memory.module';

@Module({
  imports: [
    MemoryModule,
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  providers: [ConversationResolver],
})
export class ConversationModule {}
