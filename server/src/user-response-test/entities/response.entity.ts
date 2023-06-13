// response.entity.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { ItemQuestion } from 'src/tests/entities/item-question.entity';

@ObjectType()
export class Response {
  @Field()
  id: string;

  @Field()
  itemQuestionId: string;

  @Field(() => ItemQuestion)
  itemQuestion: ItemQuestion;
}
