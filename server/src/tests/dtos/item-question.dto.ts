import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateItemQuestionDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  questionId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  courseId: string;
}

@InputType()
export class UpdateItemQuestionDto {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  description: string;
}
