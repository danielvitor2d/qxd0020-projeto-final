import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCourseDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  university: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  departmentId: string;
}

@InputType()
export class UpdateCourseDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  university: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  departmentId: string;
}
