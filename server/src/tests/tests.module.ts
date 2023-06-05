import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { CoursesResolver } from './courses.resolver';
import { ItemQuestionResolver } from './item-question.resolver';
import { QuestionResolver } from './question.resolver';
import { TestsResolver } from './tests.resolver';
import { TestsService } from './tests.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    TestsService,
    CoursesResolver,
    TestsResolver,
    ItemQuestionResolver,
    QuestionResolver,
  ],
  exports: [TestsService],
})
export class TestsModule {}
