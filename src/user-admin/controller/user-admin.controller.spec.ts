import { Test, TestingModule } from '@nestjs/testing';
import { UserAdminController } from './user-admin.controller';
import { UserAdminService } from '../service/user-admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userAdminEntity } from '../model/user-admin.entity';
import { userAdminRepositoryMock } from '../mock/user-admin.repository.mock';
import { userAdminUpdateArgs } from '../model/user-admin.args';

describe('UserAdminController', () => {
  let controller: UserAdminController;
  let service: UserAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAdminController],
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
              .mockImplementation(async ({ id, args }: userAdminUpdateArgs) => {
                const indexItem = userAdminRepositoryMock.findIndex(
                  (item) => item.id === id,
                );
                userAdminRepositoryMock[indexItem] = { id: id, ...args };
                return userAdminRepositoryMock[indexItem];
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserAdminController>(UserAdminController);
    service = module.get<UserAdminService>(UserAdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
