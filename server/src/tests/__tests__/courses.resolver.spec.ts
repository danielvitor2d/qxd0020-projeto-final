import { Test } from '@nestjs/testing';
import { CoursesResolver } from '../courses.resolver';
import { CreateCourseDto, UpdateCourseDto } from '../dtos/course.dto';
import { Course } from '../entities/course.entity';
import { TestsService } from '../tests.service';

describe('CoursesResolver', () => {
  let resolver: CoursesResolver;
  let testsService: TestsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CoursesResolver,
        {
          provide: TestsService,
          useValue: {
            createCourse: jest.fn().mockResolvedValue({} as Course),
            updateCourse: jest.fn().mockResolvedValue({} as Course),
            deleteCourse: jest.fn().mockResolvedValue({} as Course),
            getCourseById: jest.fn().mockResolvedValue({} as Course),
            getAllCourses: jest.fn().mockResolvedValue([] as Course[]),
          },
        },
      ],
    }).compile();

    resolver = moduleRef.get<CoursesResolver>(CoursesResolver);
    testsService = moduleRef.get<TestsService>(TestsService);
  });

  describe('createCourse', () => {
    it('should call testsService.createCourse and return the created course', async () => {
      const createCourseDto: CreateCourseDto = {
        name: 'EC',
        university: 'UFC',
      };
      const createdCourse: Course = {
        id: '123',
        name: 'EC',
        university: 'UFC',
        questionItems: [],
      };
      // testsService.createCourse.mockResolvedValue(createdCourse);

      const result = await resolver.createCourse(createCourseDto);

      expect(testsService.createCourse).toHaveBeenCalledWith(createCourseDto);
      expect(result).toEqual(createdCourse);
    });
  });

  describe('updateCourse', () => {
    it('should call testsService.updateCourse and return the updated course', async () => {
      const id = 'course-id';
      const updateCourseDto: UpdateCourseDto = {
        name: 'EC',
        university: 'UFC',
      };
      const updatedCourse: Course = {
        id: '123',
        name: 'EC',
        university: 'UFC',
        questionItems: [],
      };
      // testsService.updateCourse.mockResolvedValue(updatedCourse);

      const result = await resolver.updateCourse(id, updateCourseDto);

      expect(testsService.updateCourse).toHaveBeenCalledWith(
        id,
        updateCourseDto,
      );
      expect(result).toEqual(updatedCourse);
    });
  });

  describe('deleteCourse', () => {
    it('should call testsService.deleteCourse and return the deleted course', async () => {
      const id = 'course-id';
      const deletedCourse: Course = {
        id: '123',
        name: 'EC',
        university: 'UFC',
        questionItems: [],
      };
      // testsService.deleteCourse.mockResolvedValue(deletedCourse);

      const result = await resolver.deleteCourse(id);

      expect(testsService.deleteCourse).toHaveBeenCalledWith(id);
      expect(result).toEqual(deletedCourse);
    });
  });

  describe('getCourseById', () => {
    it('should call testsService.getCourseById and return the course with the specified ID', async () => {
      const id = 'course-id';
      const course: Course = {
        id: '123',
        name: 'EC',
        university: 'UFC',
        questionItems: [],
      };
      // testsService.getCourseById.mockResolvedValue(course);

      const result = await resolver.getCourseById(id);

      expect(testsService.getCourseById).toHaveBeenCalledWith(id);
      expect(result).toEqual(course);
    });
  });

  describe('getAllCourses', () => {
    it('should call testsService.getAllCourses and return an array of courses', async () => {
      const courses: Course[] = [
        {
          id: '123',
          name: 'EC',
          university: 'UFC',
          questionItems: [],
        },
        {
          id: '321',
          name: 'CC',
          university: 'UFC',
          questionItems: [],
        },
      ];
      // testsService.getAllCourses.mockResolvedValue(courses);

      const result = await resolver.getAllCourses();

      expect(testsService.getAllCourses).toHaveBeenCalled();
      expect(result).toEqual(courses);
    });
  });
});
