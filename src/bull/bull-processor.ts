import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('test-queue')
export class BullProcessor {
  @Process('test-job')
  async handleTestJob(job: Job) {
    console.log('Processing job:', job.data);
  }
}
