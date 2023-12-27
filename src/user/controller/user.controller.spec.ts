import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntity } from '../model/user.entity';
import {
  userDeleteArgs,
  userSaveArgs,
  userUpdateArgs,
} from '../model/user.args';
import { userRepositoryMock } from '../mock/user.repository-mock';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(userEntity),
          useValue: {
            save: jest.fn().mockImplementation(async (req: userSaveArgs) => {
              req.id = userRepositoryMock.length + 1;
              userRepositoryMock.push(req);
              return userRepositoryMock[userRepositoryMock.length - 1];
            }),
            findOneBy: jest
              .fn()
              .mockImplementation(async (req: { id: number }) => {
                const index: number = userRepositoryMock.findIndex(
                  (item) => item.id === req.id,
                );
                return userRepositoryMock[index];
              }),
            find: jest.fn().mockImplementation(async () => {
              return userRepositoryMock;
            }),
            update: jest
              .fn()
              .mockImplementation(async ({ id, args }: userUpdateArgs) => {
                const indexItem = userRepositoryMock.findIndex(
                  (item) => item.id === id,
                );
                userRepositoryMock[indexItem] = { ...args, id: id };
                return userRepositoryMock[indexItem];
              }),
            delete: jest
              .fn()
              .mockImplementation(async (req: userDeleteArgs) => {
                const indexItem = userRepositoryMock.findIndex(
                  (item) => item.id === req,
                );
                userRepositoryMock.splice(indexItem, 1);
                return userRepositoryMock;
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
