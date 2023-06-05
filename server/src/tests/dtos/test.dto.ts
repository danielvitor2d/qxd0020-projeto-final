import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTestDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;
}

@InputType()
export class UpdateTestDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;
}
