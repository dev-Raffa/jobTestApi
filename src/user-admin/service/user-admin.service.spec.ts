import { Test, TestingModule } from '@nestjs/testing';
import { UserAdminService } from './user-admin.service';
import { Repository } from 'typeorm';
import { userAdminEntity } from '../model/user-admin.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userAdminRepositoryMock } from '../mock/user-admin.repository.mock';
import { userAdminUpdateArgs } from '../model/user-admin.args';
import { userAdminUpdateMock } from '../mock/user-admin.reqs.mock';

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
            find: jest.fn().mockImplementation(async()=>{
              return userAdminRepositoryMock
            }),
            update: jest.fn().mockImplementation(async(req:userAdminUpdateArgs)=>{
              const indexItem = userAdminRepositoryMock.findIndex((item)=> item.id === req.id)
              userAdminRepositoryMock[indexItem] = req
              return userAdminRepositoryMock[indexItem]
            }),
          }
        }
      ],
    }).compile();

    service = module.get<UserAdminService>(UserAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe ('get', ()=>{
    it('should return one user', async() =>{
      const result: userAdminEntity = await service.get()
      
      expect(result).toBeDefined();
    })
  })

  describe('update', ()=>{
    it('should return update user', async ()=>{
      const result = await service.update(userAdminUpdateMock)

      expect(result).not.toEqual(userAdminRepositoryMock[userAdminUpdateMock.id])
    })
  })

});
