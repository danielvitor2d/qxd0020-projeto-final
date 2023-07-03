import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Course } from './course.entity';

@ObjectType('department')
export class Department {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [Course])
  courses: Course[];
}
