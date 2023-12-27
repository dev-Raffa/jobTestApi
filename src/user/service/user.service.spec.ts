import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { userEntity } from '../model/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  userDeleteArgs,
  userSaveArgs,
  userUpdateArgs,
  userValidateArgs,
} from '../model/user.args';
import { userRepositoryMock } from '../mock/user.repository-mock';
import {
  userAddMock,
  userUpdateMock,
  userValidateFailMock,
  userValidateSuccessMock,
} from '../mock/user.req-mock';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<userEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<userEntity>>(
      getRepositoryToken(userEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('add', () => {
    it('should return user when save with success', async () => {
      const result = await service.add(userAddMock);

      expect(result).toEqual(userAddMock);
    });
  });

  describe('getOneById', () => {
    it('should return one user', async () => {
      const result: userEntity = await service.getOneById(2);
      expect(result.id).toEqual(2);
    });
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const result: userEntity[] = await service.getAll();

      expect(result.length).toEqual(userRepositoryMock.length);
    });
  });

  describe('update', () => {
    it('should return update user', async () => {
      const result = await service.update(userUpdateMock);

      expect(result).not.toEqual(userRepositoryMock[userUpdateMock.id]);
    });
  });

  describe('delete', () => {
    it('must remove the user from the repository', async () => {
      const oldRepository = userRepositoryMock;

      const result = await service.delete(4);

      expect(result).not.toContainEqual(oldRepository[3]);
    });
  });

  describe('validate', () => {
    it('should return user with success when e-mail & password do match', async () => {
      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementationOnce(async (req: userValidateArgs) => {
          return await userRepositoryMock.find((user) => {
            if (user.email === req.email && user.password === req.password) {
              return user;
            }
          });
        });

      const result = await service.validate(userValidateSuccessMock);

      expect(result).toBeDefined();
    });

    it('should return undefined when email or passrowd do not macth', async () => {
      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementationOnce(async (req: userValidateArgs) => {
          return await userRepositoryMock.find((user) => {
            if (user.email === req.email && user.password === req.password) {
              return user;
            }
          });
        });

      const result = await service.validate(userValidateFailMock);

      expect(result).toBeUndefined();
    });
  });
});
