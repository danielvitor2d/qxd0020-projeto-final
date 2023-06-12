// user-response-test.entity.ts
import { Field, ObjectType } from '@nestjs/graphql';

import { Response } from './response.entity';

@ObjectType()
export class UserResponseTest {
  @Field()
  userId: string;

  @Field()
  testId: string;

  @Field(() => [Response])
  responses: Response[];

  @Field()
  createdAt: Date;
}
