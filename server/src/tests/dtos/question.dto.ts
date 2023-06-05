import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateQuestionDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  testId: string;
}

@InputType()
export class UpdateQuestionDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;
}
