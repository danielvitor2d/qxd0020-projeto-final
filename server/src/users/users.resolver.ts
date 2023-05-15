import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Field,
  ObjectType,
} from '@nestjs/graphql';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@ObjectType()
class Token {
  @Field()
  access_token: string;
}

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => Token)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.usersService.verifyUser(email, password);
    if (!user) throw new Error('E-mail ou senha inválidos');
    return this.usersService.login(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const { id, ...userUpdate } = updateUserInput;
    return this.usersService.update(id, userUpdate);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updatePass(@Args('id') id: string, @Args('password') pass: string) {
    return this.usersService.updatePass(id, pass);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }
}
