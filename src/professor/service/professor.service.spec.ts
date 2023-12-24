import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorService } from './professor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfessorEntity } from '../model/professor.entity';
import { Repository } from 'typeorm';
import { professorRepositoryMock } from '../mock/professor.repository-mock';
import { professorDeleteArgs, professorSaveArgs, professorUpdateArgs } from '../model/professor.args';
import { professorAddMock, professorUpdateMock } from '../mock/professor.req-mock';

describe('ProfessorService', () => {
  let service: ProfessorService;
  let repository: Repository<ProfessorEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessorService,
        {
          provide: getRepositoryToken(ProfessorEntity),
          useValue:{
            save: jest.fn().mockImplementation(async (req: professorSaveArgs)=>{
              req.id = professorRepositoryMock.length + 1
              professorRepositoryMock.push(req)
              return professorRepositoryMock[professorRepositoryMock.length -1]
            }),
            findOneBy: jest.fn().mockImplementation(async(req: {id:number})=>{
              const index:number = professorRepositoryMock.findIndex((item)=> item.id === req.id)
              return professorRepositoryMock[index];
            }),
            find: jest.fn().mockImplementation(async()=>{
              return professorRepositoryMock
            }),
            update: jest.fn().mockImplementation(async(req:professorUpdateArgs)=>{
              const indexItem = professorRepositoryMock.findIndex((item)=> item.id === req.id)
              professorRepositoryMock[indexItem] = req
              return professorRepositoryMock[indexItem]
            }),
            delete: jest.fn().mockImplementation(async(req:professorDeleteArgs)=>{
              const indexItem = professorRepositoryMock.findIndex((item)=> item.id === req)
              professorRepositoryMock.splice(indexItem,1)             
              return professorRepositoryMock;
            })
          }
        }
      ],
    }).compile();

    service = module.get<ProfessorService>(ProfessorService);
    repository = module.get<Repository<ProfessorEntity>>(getRepositoryToken(ProfessorEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('add', ()=>{

    it('should return professor when save with success', async()=>{
      const result = await service.add(professorAddMock)
      
      expect(result).toEqual(professorAddMock)
    })
  })

  describe ('getOneById', ()=>{
    it('should return one professor', async() =>{
      const result: ProfessorEntity = await service.getOneById(2)
      expect(result.id).toEqual(2)

    })
  })

  describe('getAll', ()=>{
    it('should return all professores', async ()=> {
      const result: ProfessorEntity[] = await service.getAll()

      expect(result.length).toEqual(professorRepositoryMock.length)
    })
  })

  describe('update', ()=>{
    it('should return update professor', async ()=>{
      const result = await service.update(professorUpdateMock)

      expect(result).not.toEqual(professorRepositoryMock[professorUpdateMock.id])
    })
  })

  describe('delete',()=>{
    it('must remove the professor from the repository', async ()=>{
      const oldRepository = professorRepositoryMock;

      const result = await service.delete(4)

      expect(result).not.toContainEqual(oldRepository[3])  
    })
  })
});
