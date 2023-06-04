import { Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [PrismaService, ConfigService],
})
export class AppModule {}
