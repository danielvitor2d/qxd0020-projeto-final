import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Question } from './question.entity';

@ObjectType('test')
export class TestEntity {
  @Field(() => ID)
  id: string;

  @Field()
  description: string;

  @Field(() => [Question])
  questions: Question[];
}
