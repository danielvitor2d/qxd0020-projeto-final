import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PrismaService } from './database/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [PrismaService, ConfigService],
})
export class AppModule {}
