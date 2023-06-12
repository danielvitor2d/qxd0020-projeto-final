import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateResponseInput {
  @Field()
  itemQuestionId: string;
}
