import { Module } from '@nestjs/common';
import { BullModule as NestBullModule } from '@nestjs/bull';
import { BullService } from './bull.service';
import { BullProcessor } from './bull-processor';

@Module({
  imports: [
    NestBullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    NestBullModule.registerQueue({
      name: 'test-queue',
    }),
  ],
  providers: [BullService, BullProcessor],
})
export class BullModule {}
