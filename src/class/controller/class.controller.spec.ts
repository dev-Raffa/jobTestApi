import { Test, TestingModule } from '@nestjs/testing';
import { ClassController } from './class.controller';
import { ClassService } from '../service/class.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClassEntity } from '../model/class.entity';
import {
  classDeleteArgs,
  classSaveArgs,
  classUpdateArgs,
} from '../model/class.args';
import { classRepositoryMock } from '../mock/class.repository-mock';

describe('ClassController', () => {
  let controller: ClassController;
  let service: ClassService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassController],
      providers: [
        ClassService,
        {
          provide: getRepositoryToken(ClassEntity),
          useValue: {
            save: jest.fn().mockImplementation(async (req: classSaveArgs) => {
              req.id = classRepositoryMock.length + 1;
              classRepositoryMock.push(req);
              return classRepositoryMock[classRepositoryMock.length - 1];
            }),
            findOneBy: jest
              .fn()
              .mockImplementation(async (req: { id: number }) => {
                const index: number = classRepositoryMock.findIndex(
                  (item) => item.id === req.id,
                );
                return classRepositoryMock[index];
              }),
            find: jest.fn().mockImplementation(async () => {
              return classRepositoryMock;
            }),
            update: jest
              .fn()
              .mockImplementation(async (req: classUpdateArgs) => {
                const indexItem = classRepositoryMock.findIndex(
                  (item) => item.id === req.id,
                );
                classRepositoryMock[indexItem] = { id: req.id, ...req.args };
                return classRepositoryMock[indexItem];
              }),
            delete: jest
              .fn()
              .mockImplementation(async (req: classDeleteArgs) => {
                const indexItem = classRepositoryMock.findIndex(
                  (item) => item.id === req,
                );
                classRepositoryMock.splice(indexItem, 1);
                return classRepositoryMock;
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<ClassController>(ClassController);
    service = module.get<ClassService>(ClassService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
