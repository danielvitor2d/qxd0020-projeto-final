import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CreateItemQuestionDto,
  UpdateItemQuestionDto,
} from './dtos/item-question.dto';
import { ItemQuestion } from './entities/item-question.entity';
import { TestsService } from './tests.service';

@Resolver(() => ItemQuestion)
export class ItemQuestionResolver {
  constructor(private testsService: TestsService) {}

  @Mutation(() => ItemQuestion)
  async createItemQuestion(
    @Args('input') createItemQuestionDto: CreateItemQuestionDto,
  ) {
    return this.testsService.createItemQuestion(createItemQuestionDto);
  }

  @Mutation(() => ItemQuestion)
  async updateItemQuestion(
    @Args('id') id: string,
    @Args('input') updateItemQuestionDto: UpdateItemQuestionDto,
  ) {
    return this.testsService.updateItemQuestion(id, updateItemQuestionDto);
  }

  @Mutation(() => ItemQuestion)
  async deleteItemQuestion(@Args('id') id: string) {
    return this.testsService.deleteItemQuestion(id);
  }

  @Query(() => ItemQuestion, { nullable: true })
  async getItemQuestionById(@Args('id') id: string) {
    return this.testsService.getItemQuestionById(id);
  }

  @Query(() => [ItemQuestion])
  async getAllItemQuestions() {
    return this.testsService.getAllItemQuestions();
  }
}
