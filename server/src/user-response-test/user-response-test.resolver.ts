import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserResponseTestInput } from './dtos/create-user-response-test.input';
import { UserResponseTest } from './entities/user-response-test.entity';
import { UserResponseTestService } from './user-response-test.service';

@Resolver(() => UserResponseTest)
export class UserResponseTestResolver {
  constructor(
    private readonly userResponseTestService: UserResponseTestService,
  ) {}

  @Mutation(() => UserResponseTest)
  async createUserResponseTest(
    @Args('data') createUserResponseTestInput: CreateUserResponseTestInput,
  ) {
    const { userId, testId, responses } = createUserResponseTestInput;
    return this.userResponseTestService.createUserResponseTest(
      userId,
      testId,
      responses,
    );
  }

  @Query(() => [UserResponseTest])
  async getUserResponseTestsByUserId(@Args('userId') userId: string) {
    return this.userResponseTestService.getUserResponseTestsByUserId(userId);
  }

  @Query(() => [UserResponseTest])
  async getUserResponseTestsByUserIdAndTestId(
    @Args('userId') userId: string,
    @Args('testId') testId: string,
  ) {
    return this.userResponseTestService.getUserResponseTestsByUserIdAndTestId(
      userId,
      testId,
    );
  }

  @Query(() => UserResponseTest)
  async getUserResponseTest(
    @Args('userId') userId: string,
    @Args('testId') testId: string,
    @Args('createdAt') createdAt: string,
  ) {
    return this.userResponseTestService.getUserResponseTest(
      userId,
      testId,
      createdAt,
    );
  }
}
