import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Course } from './course.entity';
import { Question } from './question.entity';

@ObjectType('item_question')
export class ItemQuestion {
  @Field(() => ID)
  id: string;

  @Field()
  description: string;

  @Field(() => Question)
  question: Question;

  @Field()
  questionId: string;

  @Field(() => Course)
  course: Course;

  @Field()
  courseId: string;
}
