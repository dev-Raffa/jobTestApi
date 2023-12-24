import { Test, TestingModule } from '@nestjs/testing';
import { ClassService } from './class.service';
import { Repository } from 'typeorm';
import { ClassEntity } from '../model/class.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { classDeleteArgs, classSaveArgs, classUpdateArgs } from '../model/class.args';
import { classRepositoryMock } from '../mock/class.repository-mock';
import { classAddMock, classUpdateMock } from '../mock/class.reqs-mock';

describe('ClassService', () => {
  let service: ClassService;
  let repository: Repository<ClassEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassService,
        {
          provide: getRepositoryToken(ClassEntity),
          useValue:{
            save: jest.fn().mockImplementation(async (req: classSaveArgs)=>{
              req.id = classRepositoryMock.length + 1
              classRepositoryMock.push(req)
              return classRepositoryMock[classRepositoryMock.length -1]
            }),
            findOneBy: jest.fn().mockImplementation(async(req: {id:number})=>{
              const index:number = classRepositoryMock.findIndex((item)=> item.id === req.id)
              return classRepositoryMock[index];
            }),
            find: jest.fn().mockImplementation(async()=>{
              return classRepositoryMock
            }),
            update: jest.fn().mockImplementation(async(req:classUpdateArgs)=>{
              const indexItem = classRepositoryMock.findIndex((item)=> item.id === req.id)
              classRepositoryMock[indexItem] = req
              return classRepositoryMock[indexItem]
            }),
            delete: jest.fn().mockImplementation(async(req:classDeleteArgs)=>{
              const indexItem = classRepositoryMock.findIndex((item)=> item.id === req)
              classRepositoryMock.splice(indexItem,1)             
              return classRepositoryMock;
            })
          }
        }
      ],
    }).compile();

    service = module.get<ClassService>(ClassService);
    repository = module.get<Repository<ClassEntity>>(getRepositoryToken(ClassEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('add', ()=>{

    it('should return class when save with success', async()=>{
      const result = await service.add(classAddMock)
      
      expect(result).toEqual(classAddMock)
    })
  })

  describe ('getOneById', ()=>{
    it('should return one class', async() =>{
      const result: ClassEntity = await service.getOneById(2)
      expect(result.id).toEqual(2)

    })
  })

  describe('getAll', ()=>{
    it('should return all classes', async ()=> {
      const result: ClassEntity[] = await service.getAll()

      expect(result.length).toEqual(classRepositoryMock.length)
    })
  })

  describe('update', ()=>{
    it('should return update class', async ()=>{
      const result = await service.update(classUpdateMock)

      expect(result).not.toEqual(classRepositoryMock[classUpdateMock.id])
    })
  })

  describe('delete',()=>{
    it('must remove the class from the repository', async ()=>{
      const oldRepository = classRepositoryMock;

      const result = await service.delete(4)

      expect(result).not.toContainEqual(oldRepository[3])

      
    })
  })
});
