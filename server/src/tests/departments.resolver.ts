import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from './dtos/department.dto';
import { Department } from './entities/department.entity';
import { TestsService } from './tests.service';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private testsService: TestsService) {}

  @Mutation(() => Department)
  async createDepartment(
    @Args('input') createDepartmentDto: CreateDepartmentDto,
  ) {
    return this.testsService.createDepartment(createDepartmentDto);
  }

  @Mutation(() => Department)
  async updateDepartment(
    @Args('id') id: string,
    @Args('input') updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.testsService.updateDepartment(id, updateDepartmentDto);
  }

  @Mutation(() => Department)
  async deleteDepartment(@Args('id') id: string) {
    return this.testsService.deleteDepartment(id);
  }

  @Query(() => Department, { nullable: true })
  async getDepartmentById(@Args('id') id: string) {
    return this.testsService.getDepartmentById(id);
  }

  @Query(() => [Department])
  async getAllDepartments() {
    return this.testsService.getAllDepartments();
  }
}
