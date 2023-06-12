// response.entity.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Response {
  @Field()
  id: string;

  @Field()
  itemQuestionId: string;

  // Add other fields as necessary
}
