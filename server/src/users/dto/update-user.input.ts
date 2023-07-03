import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password', 'roles']),
) {
  @Field(() => ID, { description: 'ID of user' })
  id: string;
}
