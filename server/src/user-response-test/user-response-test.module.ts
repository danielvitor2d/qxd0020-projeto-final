import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { UserResponseTestResolver } from './user-response-test.resolver';
import { UserResponseTestService } from './user-response-test.service';

@Module({
  imports: [],
  providers: [PrismaService, UserResponseTestService, UserResponseTestResolver],
  exports: [UserResponseTestService],
})
export class UserResponseTestModule {}
