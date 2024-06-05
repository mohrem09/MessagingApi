import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { MemoryModule } from '../memory/memory.module';

@Module({
  imports: [MemoryModule],
  providers: [UserResolver],
})
export class UserModule {}
