import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Department } from './department.entity';
import { ItemQuestion } from './item-question.entity';

@ObjectType('course')
export class Course {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  university: string;

  @Field(() => Department)
  department: Department;

  @Field()
  departmentId: string;

  @Field(() => [ItemQuestion])
  questionItems: ItemQuestion[];
}
