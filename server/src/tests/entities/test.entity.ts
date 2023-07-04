import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Department } from './department.entity';
import { Question } from './question.entity';

@ObjectType('test')
export class TestEntity {
  @Field(() => ID)
  id: string;

  @Field()
  departmentId: string;

  @Field(() => Department)
  department: Department;

  @Field()
  description: string;

  @Field(() => [Question])
  questions: Question[];
}
