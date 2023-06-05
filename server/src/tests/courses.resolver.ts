import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateCourseDto, UpdateCourseDto } from './dtos/course.dto';
import { Course } from './entities/course.entity';
import { TestsService } from './tests.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private testsService: TestsService) {}

  @Mutation(() => Course)
  async createCourse(@Args('input') createCourseDto: CreateCourseDto) {
    return this.testsService.createCourse(createCourseDto);
  }

  @Mutation(() => Course)
  async updateCourse(
    @Args('id') id: string,
    @Args('input') updateCourseDto: UpdateCourseDto,
  ) {
    return this.testsService.updateCourse(id, updateCourseDto);
  }

  @Mutation(() => Course)
  async deleteCourse(@Args('id') id: string) {
    return this.testsService.deleteCourse(id);
  }

  @Query(() => Course, { nullable: true })
  async getCourseById(@Args('id') id: string) {
    return this.testsService.getCourseById(id);
  }

  @Query(() => [Course])
  async getAllCourses() {
    return this.testsService.getAllCourses();
  }
}
