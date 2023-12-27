import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from '../service/course.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CourseEntity } from '../model/course.entity';
import {
  courseDeleteArgs,
  courseSaveArgs,
  courseUpdateArgs,
} from '../model/course.args';
import { courseRepositoryMock } from '../mock/course.repositoy-mock';

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        CourseService,
        {
          provide: getRepositoryToken(CourseEntity),
          useValue: {
            save: jest.fn().mockImplementation(async (req: courseSaveArgs) => {
              req.id = courseRepositoryMock.length + 1;
              courseRepositoryMock.push(req);
              return courseRepositoryMock[courseRepositoryMock.length - 1];
            }),
            findOneBy: jest
              .fn()
              .mockImplementation(async (req: { id: number }) => {
                const index: number = courseRepositoryMock.findIndex(
                  (item) => item.id === req.id,
                );
                return courseRepositoryMock[index];
              }),
            find: jest.fn().mockImplementation(async () => {
              return courseRepositoryMock;
            }),
            update: jest
              .fn()
              .mockImplementation(async (req: courseUpdateArgs) => {
                const indexItem = courseRepositoryMock.findIndex(
                  (item) => item.id === req.id,
                );
                courseRepositoryMock[indexItem] = { id: req.id, ...req.args };
                return courseRepositoryMock[indexItem];
              }),
            delete: jest
              .fn()
              .mockImplementation(async (req: courseDeleteArgs) => {
                const indexItem = courseRepositoryMock.findIndex(
                  (item) => item.id === req,
                );
                courseRepositoryMock.splice(indexItem, 1);
                return courseRepositoryMock;
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
