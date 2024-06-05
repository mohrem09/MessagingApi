import { Test, TestingModule } from '@nestjs/testing';
import { BullProcessor } from './bull-processor';

describe('BullProcessor', () => {
  let provider: BullProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BullProcessor],
    }).compile();

    provider = module.get<BullProcessor>(BullProcessor);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
