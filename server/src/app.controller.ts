import { Body, Controller, Get } from '@nestjs/common';

import { PrismaService } from './database/prisma.service';
import { CreateUser } from './dtos/create-user';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getHello(@Body() body: CreateUser) {
    const { name } = body;

    const member = await this.prisma.user.create({
      data: {
        name,
      },
    });

    return {
      member,
    };
  }
}
