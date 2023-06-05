import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateTestDto, UpdateTestDto } from './dtos/test.dto';
import { TestEntity } from './entities/test.entity';
import { TestsService } from './tests.service';

@Resolver(() => TestEntity)
export class TestsResolver {
  constructor(private testsService: TestsService) {}

  @Mutation(() => TestEntity)
  async createTest(@Args('input') createTestDto: CreateTestDto) {
    return this.testsService.createTest(createTestDto);
  }

  @Mutation(() => TestEntity)
  async updateTest(
    @Args('id') id: string,
    @Args('input') updateTestDto: UpdateTestDto,
  ) {
    return this.testsService.updateTest(id, updateTestDto);
  }

  @Mutation(() => TestEntity)
  async deleteTest(@Args('id') id: string) {
    return this.testsService.deleteTest(id);
  }

  @Query(() => TestEntity, { nullable: true })
  async getTestById(@Args('id') id: string) {
    return this.testsService.getTestById(id);
  }

  @Query(() => [TestEntity])
  async getAllTests() {
    return this.testsService.getAllTests();
  }
}
