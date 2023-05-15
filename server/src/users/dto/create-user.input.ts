import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Name of user' })
  name: string;

  @Field({ description: 'E-mail of user' })
  email: string;

  @Field({ description: 'Phone number of user' })
  phonenumber: string;

  @Field({ description: 'Hashed Password of user' })
  password: string;

  @Field({ description: 'Roles of user', defaultValue: 'student' })
  roles?: string;
}
