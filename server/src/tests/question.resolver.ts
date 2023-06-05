import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateQuestionDto, UpdateQuestionDto } from './dtos/question.dto';
import { Question } from './entities/question.entity';
import { TestsService } from './tests.service';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private testsService: TestsService) {}

  @Mutation(() => Question)
  async createQuestion(@Args('input') createQuestionDto: CreateQuestionDto) {
    return this.testsService.createQuestion(createQuestionDto);
  }

  @Mutation(() => Question)
  async updateQuestion(
    @Args('id') id: string,
    @Args('input') updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.testsService.updateQuestion(id, updateQuestionDto);
  }

  @Mutation(() => Question)
  async deleteQuestion(@Args('id') id: string) {
    return this.testsService.deleteQuestion(id);
  }

  @Query(() => Question, { nullable: true })
  async getQuestionById(@Args('id') id: string) {
    return this.testsService.getQuestionById(id);
  }

  @Query(() => [Question])
  async getAllQuestions() {
    return this.testsService.getAllQuestions();
  }
}
