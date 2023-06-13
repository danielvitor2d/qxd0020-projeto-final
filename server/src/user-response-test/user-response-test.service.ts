// user-response-test.service.ts
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { CreateResponseInput } from './dtos/create-response.input';
import { UserResponseTest } from './entities/user-response-test.entity';

@Injectable()
export class UserResponseTestService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserResponseTest(
    userId: string,
    testId: string,
    responses: CreateResponseInput[],
  ): Promise<UserResponseTest> {
    const now = new Date().toISOString();

    const userResponseTest = await this.prisma.userResponseTest.create({
      data: {
        userId,
        testId,
        responses: {
          createMany: {
            data: responses,
          },
        },
        createdAt: now,
      },
      include: {
        responses: true,
      },
    });

    return userResponseTest;
  }

  async getUserResponseTestsByUserId(
    userId: string,
  ): Promise<UserResponseTest[]> {
    const userResponseTests = await this.prisma.userResponseTest.findMany({
      where: {
        userId,
      },
      include: {
        responses: true,
      },
    });

    return userResponseTests;
  }

  async getUserResponseTestsByUserIdAndTestId(
    userId: string,
    testId: string,
  ): Promise<UserResponseTest[]> {
    const userResponseTests = await this.prisma.userResponseTest.findMany({
      where: {
        userId,
        testId,
      },
      include: {
        responses: true,
      },
    });

    return userResponseTests;
  }
}
