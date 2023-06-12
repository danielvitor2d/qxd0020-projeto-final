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
  ): Promise<UserResponseTest> {
    const { userId, testId, responses } = createUserResponseTestInput;
    return this.userResponseTestService.createUserResponseTest(
      userId,
      testId,
      responses,
    );
  }

  @Query(() => UserResponseTest, { nullable: true })
  async findUserResponseTestById(
    @Args('userId') userId: string,
    @Args('createdAt') createdAt: Date,
    @Args('testId') testId: string,
  ): Promise<UserResponseTest | null> {
    return this.userResponseTestService.findUserResponseTestById(
      userId,
      createdAt,
      testId,
    );
  }
}
