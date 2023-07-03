import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateDepartmentDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}

@InputType()
export class UpdateDepartmentDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}
