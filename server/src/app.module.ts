import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { TestsModule } from './tests/tests.module';
import { UserResponseTestModule } from './user-response-test/user-response-test.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    UserResponseTestModule,
    TestsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [TestsModule, UsersModule, UserResponseTestModule],
      context: ({ tests }) => ({
        tests,
      }),
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      playground: true,
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService, ConfigService],
})
export class AppModule {}
