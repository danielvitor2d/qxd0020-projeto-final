import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { PrismaService } from './database/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000, async () =>
    console.log('Server is running...', await app.getUrl()),
  );
}
bootstrap();
