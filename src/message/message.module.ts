import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MessageProcessor } from './message.processor';
import { MemoryModule } from '../memory/memory.module';

@Module({
  imports: [
    MemoryModule,
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  providers: [ MessageProcessor],
})
export class MessageModule {}
