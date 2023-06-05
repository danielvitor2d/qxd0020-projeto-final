import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ItemQuestion } from './item-question.entity';
import { TestEntity } from './test.entity';

@ObjectType('question')
export class Question {
  @Field(() => ID)
  id: string;

  @Field()
  description: string;

  @Field(() => TestEntity)
  test: TestEntity;

  @Field()
  testId: string;

  @Field(() => [ItemQuestion])
  questionItems: ItemQuestion[];
}
