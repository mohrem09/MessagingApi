import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class BullService {
  constructor(@InjectQueue('test-queue') private readonly testQueue: Queue) {}

  async addJob() {
    await this.testQueue.add('test-job', {
      foo: 'bar',
    });
  }
}
