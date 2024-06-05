import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { MemoryService } from './memory/memory.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
    ConversationModule,
    MessageModule,
  ],
  providers: [MemoryService],
})
export class AppModule {}
