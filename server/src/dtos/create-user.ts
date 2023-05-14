import { IsNotEmpty } from 'class-validator';

export class CreateUser {
  @IsNotEmpty({
    message: 'Name must not be empty',
  })
  name: string;
}
