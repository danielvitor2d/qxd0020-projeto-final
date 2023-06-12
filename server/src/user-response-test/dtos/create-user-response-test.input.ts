import { Field, ID, InputType } from '@nestjs/graphql';
import { CreateResponseInput } from './create-response.input';

@InputType()
export class CreateUserResponseTestInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  testId: string;

  @Field(() => [CreateResponseInput])
  responses: CreateResponseInput[];
}
