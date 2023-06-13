// user-response-test.service.ts
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { CreateResponseInput } from './dtos/create-response.input';

@Injectable()
export class UserResponseTestService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserResponseTest(
    userId: string,
    testId: string,
    responses: CreateResponseInput[],
  ) {
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
        responses: { include: { itemQuestion: { include: { course: true } } } },
        test: true,
      },
    });

    return userResponseTest;
  }

  async getUserResponseTestsByUserId(userId: string) {
    const userResponseTests = await this.prisma.userResponseTest.findMany({
      where: {
        userId,
      },
      include: {
        responses: { include: { itemQuestion: { include: { course: true } } } },
        test: true,
      },
    });

    return userResponseTests;
  }

  async getUserResponseTestsByUserIdAndTestId(userId: string, testId: string) {
    const userResponseTests = await this.prisma.userResponseTest.findMany({
      where: {
        userId,
        testId,
      },
      include: {
        responses: { include: { itemQuestion: { include: { course: true } } } },
        test: true,
      },
    });

    return userResponseTests;
  }

  async getUserResponseTest(userId: string, testId: string, createdAt: string) {
    const userResponseTests =
      await this.prisma.userResponseTest.findUniqueOrThrow({
        where: {
          userId_createdAt_testId: {
            userId,
            testId,
            createdAt,
          },
        },
        include: {
          responses: {
            include: { itemQuestion: { include: { course: true } } },
          },
          test: true,
        },
      });

    return userResponseTests;
  }
}
