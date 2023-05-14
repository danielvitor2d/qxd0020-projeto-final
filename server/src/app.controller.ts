import { Controller, Get } from '@nestjs/common';

import { PrismaService } from './database/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getHello() {
    return 'Hello';
  }
}
