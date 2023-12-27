import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorController } from './professor.controller';
import { ProfessorService } from '../service/professor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfessorEntity } from '../model/professor.entity';
import {
  professorDeleteArgs,
  professorSaveArgs,
  professorUpdateArgs,
} from '../model/professor.args';
import { professorRepositoryMock } from '../mock/professor.repository-mock';

describe('ProfessorController', () => {
  let controller: ProfessorController;
  let service: ProfessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessorController],
      providers: [
        ProfessorService,
        {
          provide: getRepositoryToken(ProfessorEntity),
          useValue: {
            save: jest
              .fn()
              .mockImplementation(async (req: professorSaveArgs) => {
                req.id = professorRepositoryMock.length + 1;
                professorRepositoryMock.push(req);
                return professorRepositoryMock[
                  professorRepositoryMock.length - 1
                ];
              }),
            findOneBy: jest
              .fn()
              .mockImplementation(async (req: { id: number }) => {
                const index: number = professorRepositoryMock.findIndex(
                  (item) => item.id === req.id,
                );
                return professorRepositoryMock[index];
              }),
            find: jest.fn().mockImplementation(async () => {
              return professorRepositoryMock;
            }),
            update: jest
              .fn()
              .mockImplementation(async (req: professorUpdateArgs) => {
                const indexItem = professorRepositoryMock.findIndex(
                  (item) => item.id === req.id,
                );
                professorRepositoryMock[indexItem] = {
                  id: req.id,
                  ...req.args,
                };
                return professorRepositoryMock[indexItem];
              }),
            delete: jest
              .fn()
              .mockImplementation(async (req: professorDeleteArgs) => {
                const indexItem = professorRepositoryMock.findIndex(
                  (item) => item.id === req,
                );
                professorRepositoryMock.splice(indexItem, 1);
                return professorRepositoryMock;
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<ProfessorController>(ProfessorController);
    service = module.get<ProfessorService>(ProfessorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
