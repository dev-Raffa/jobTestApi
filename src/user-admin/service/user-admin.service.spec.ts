import { Test, TestingModule } from '@nestjs/testing';
import { UserAdminService } from './user-admin.service';
import { Repository } from 'typeorm';
import { userAdminEntity } from '../model/user-admin.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userAdminRepositoryMock } from '../mock/user-admin.repository.mock';
import { userAdminValidateArgs } from '../model/user-admin.args';
import {
  userAdminUpdateMock,
  userAdminValidateFailedMock,
  userAdminValidateSuccessMock,
} from '../mock/user-admin.reqs.mock';

describe('UserAdminService', () => {
  let service: UserAdminService;
  let repository: Repository<userAdminEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAdminService,
        {
          provide: getRepositoryToken(userAdminEntity),
          useValue: {
            find: jest.fn().mockImplementation(async () => {
              return userAdminRepositoryMock;
            }),
            update: jest
              .fn()
              .mockImplementation(
                async (id: number, { ...args }: userAdminEntity) => {
                  const indexItem = userAdminRepositoryMock.findIndex(
                    (item) => item.id === id,
                  );
                  userAdminRepositoryMock[indexItem] = { id: id, ...args };
                  return userAdminRepositoryMock[indexItem];
                },
              ),
            findOneBy: jest
              .fn()
              .mockImplementation(async (req: userAdminValidateArgs) => {
                return userAdminRepositoryMock.find((user) => {
                  if (
                    user.user === req.user &&
                    user.password === req.password
                  ) {
                    return user;
                  }
                });
              }),
          },
        },
      ],
    }).compile();

    service = module.get<UserAdminService>(UserAdminService);
    repository = module.get<Repository<userAdminEntity>>(
      getRepositoryToken(userAdminEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('get', () => {
    it('should return one user', async () => {
      const result: userAdminEntity = await service.get();

      expect(result).toBeDefined();
    });
  });

  describe('update', () => {
    it('should return update user', async () => {
      const result = await service.update(userAdminUpdateMock);

      expect(result).toEqual(userAdminRepositoryMock[0]);
    });
  });

  describe('validate', () => {
    it('should user adimn when email and password do match', async () => {
      const result = await service.validate(userAdminValidateSuccessMock);

      expect(result).toBeDefined();
    });

    it('should return undefine when email or password do not match', async () => {
      const result = await service.validate(userAdminValidateFailedMock);

      expect(result).toBeUndefined();
    });
  });
});
