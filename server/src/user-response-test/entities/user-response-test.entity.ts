// user-response-test.entity.ts
import { Field, ObjectType } from '@nestjs/graphql';

import { TestEntity } from '../../tests/entities/test.entity';
import { Response } from './response.entity';

@ObjectType()
export class UserResponseTest {
  @Field()
  userId: string;

  @Field()
  testId: string;

  @Field(() => TestEntity)
  test: TestEntity;

  @Field(() => [Response])
  responses: Response[];

  @Field()
  createdAt: Date;
}
