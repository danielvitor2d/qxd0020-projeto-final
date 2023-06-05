import { Injectable, NotFoundException } from '@nestjs/common';
import { Course, ItemQuestion, Question, Test } from '@prisma/client';

import { PrismaService } from 'src/database/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dtos/course.dto';
import {
  CreateItemQuestionDto,
  UpdateItemQuestionDto,
} from './dtos/item-question.dto';
import { CreateQuestionDto, UpdateQuestionDto } from './dtos/question.dto';
import { CreateTestDto, UpdateTestDto } from './dtos/test.dto';

@Injectable()
export class TestsService {
  constructor(private prisma: PrismaService) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.prisma.course.create({ data: createCourseDto });
  }

  async createTest(createTestDto: CreateTestDto): Promise<Test> {
    return this.prisma.test.create({ data: createTestDto });
  }

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const { testId, ...questionData } = createQuestionDto;

    const test = await this.prisma.test.findUnique({ where: { id: testId } });
    if (!test) {
      throw new NotFoundException(`Test with ID '${testId}' not found.`);
    }

    return this.prisma.question.create({
      data: {
        ...questionData,
        test: { connect: { id: testId } },
      },
    });
  }

  async createItemQuestion(
    createItemQuestionDto: CreateItemQuestionDto,
  ): Promise<ItemQuestion> {
    const { questionId, courseId, ...itemQuestionData } = createItemQuestionDto;

    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!question) {
      throw new NotFoundException(
        `Question with ID '${questionId}' not found.`,
      );
    }

    if (!course) {
      throw new NotFoundException(`Course with ID '${courseId}' not found.`);
    }

    return this.prisma.itemQuestion.create({
      data: {
        ...itemQuestionData,
        question: { connect: { id: questionId } },
        course: { connect: { id: courseId } },
      },
    });
  }

  async updateCourse(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    const course = await this.prisma.course.findUnique({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Course with ID '${id}' not found.`);
    }

    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async updateTest(id: string, updateTestDto: UpdateTestDto): Promise<Test> {
    const test = await this.prisma.test.findUnique({ where: { id } });

    if (!test) {
      throw new NotFoundException(`Test with ID '${id}' not found.`);
    }

    return this.prisma.test.update({ where: { id }, data: updateTestDto });
  }

  async updateQuestion(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question = await this.prisma.question.findUnique({ where: { id } });

    if (!question) {
      throw new NotFoundException(`Question with ID '${id}' not found.`);
    }

    return this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async updateItemQuestion(
    id: string,
    updateItemQuestionDto: UpdateItemQuestionDto,
  ): Promise<ItemQuestion> {
    const itemQuestion = await this.prisma.itemQuestion.findUnique({
      where: { id },
    });

    if (!itemQuestion) {
      throw new NotFoundException(`Item Question with ID '${id}' not found.`);
    }

    return this.prisma.itemQuestion.update({
      where: { id },
      data: updateItemQuestionDto,
    });
  }

  async deleteCourse(id: string): Promise<Course> {
    const course = await this.prisma.course.findUnique({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Course with ID '${id}' not found.`);
    }

    return this.prisma.course.delete({ where: { id } });
  }

  async deleteTest(id: string): Promise<Test> {
    const test = await this.prisma.test.findUnique({ where: { id } });

    if (!test) {
      throw new NotFoundException(`Test with ID '${id}' not found.`);
    }

    return this.prisma.test.delete({ where: { id } });
  }

  async deleteQuestion(id: string): Promise<Question> {
    const question = await this.prisma.question.findUnique({ where: { id } });

    if (!question) {
      throw new NotFoundException(`Question with ID '${id}' not found.`);
    }

    return this.prisma.question.delete({ where: { id } });
  }

  async deleteItemQuestion(id: string): Promise<ItemQuestion> {
    const itemQuestion = await this.prisma.itemQuestion.findUnique({
      where: { id },
    });

    if (!itemQuestion) {
      throw new NotFoundException(`Item Question with ID '${id}' not found.`);
    }

    return this.prisma.itemQuestion.delete({ where: { id } });
  }

  async getCourseById(id: string): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { id },
      include: { questionItems: true },
    });
  }

  async getAllCourses(): Promise<Course[]> {
    return this.prisma.course.findMany({
      include: { questionItems: true },
    });
  }

  async getTestById(id: string): Promise<Test | null> {
    return this.prisma.test.findUnique({
      where: { id },
      include: { questions: { include: { questionItems: true, test: true } } },
    });
  }

  async getAllTests(): Promise<Test[]> {
    return this.prisma.test.findMany({
      include: { questions: { include: { questionItems: true, test: true } } },
    });
  }

  async getQuestionById(id: string): Promise<Question | null> {
    return this.prisma.question.findUnique({
      where: { id },
      include: { questionItems: true, test: true },
    });
  }

  async getAllQuestions(): Promise<Question[]> {
    return this.prisma.question.findMany({
      include: { questionItems: true, test: true },
    });
  }

  async getItemQuestionById(id: string): Promise<ItemQuestion | null> {
    return this.prisma.itemQuestion.findUnique({ where: { id }, include: { course: true, question: true } });
  }

  async getAllItemQuestions(): Promise<ItemQuestion[]> {
    return this.prisma.itemQuestion.findMany({
      include: { course: true, question: true }
    });
  }
}
