import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'ID of user' })
  id: string;

  @Field({ description: 'Name of user' })
  name: string;

  @Field({ description: 'E-mail of user' })
  email: string;

  @Field({ description: 'Phone number of user' })
  phonenumber: string;

  @Field({ description: 'Hashed Password of user' })
  hashedPassword: string;

  @Field({ description: 'Roles of user', defaultValue: 'student' })
  roles?: string;

  @Field({ description: 'Created at date' })
  createdAt: string;

  @Field({ description: 'Updated at date' })
  updatedAt: string;

  @Field({ description: 'Deleted at date', nullable: true })
  deletedAt: string | null;
}
