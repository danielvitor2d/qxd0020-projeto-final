import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ItemQuestion } from './item-question.entity';

@ObjectType('course')
export class Course {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  university: string;

  @Field(() => [ItemQuestion])
  questionItems: ItemQuestion[];
}
