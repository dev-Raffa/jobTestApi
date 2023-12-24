import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { Repository } from 'typeorm';
import { CourseEntity } from '../model/course.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { courseRepositoryMock } from '../mock/course.repositoy-mock';
import { courseDeleteArgs, courseSaveArgs, courseUpdateArgs } from '../model/course.args';
import { courseAddMock, courseUpdateMock } from '../mock/course.reqs-mock';

describe('CourseService', () => {
  let service: CourseService;
  let repository: Repository<CourseEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getRepositoryToken(CourseEntity),
          useValue:{
            save: jest.fn().mockImplementation(async (req: courseSaveArgs)=>{
              req.id = courseRepositoryMock.length + 1
              courseRepositoryMock.push(req)
              return courseRepositoryMock[courseRepositoryMock.length -1]
            }),
            findOneBy: jest.fn().mockImplementation(async(req: {id:number})=>{
              const index:number = courseRepositoryMock.findIndex((item)=> item.id === req.id)
              return courseRepositoryMock[index];
            }),
            find: jest.fn().mockImplementation(async()=>{
              return courseRepositoryMock
            }),
            update: jest.fn().mockImplementation(async(req:courseUpdateArgs)=>{
              const indexItem = courseRepositoryMock.findIndex((item)=> item.id === req.id)
              courseRepositoryMock[indexItem] = req
              return courseRepositoryMock[indexItem]
            }),
            delete: jest.fn().mockImplementation(async(req:courseDeleteArgs)=>{
              const indexItem = courseRepositoryMock.findIndex((item)=> item.id === req)
              courseRepositoryMock.splice(indexItem,1)             
              return courseRepositoryMock;
            })
          }
        }
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    repository = module.get<Repository<CourseEntity>>(getRepositoryToken(CourseEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('add', ()=>{

    it('should return course when save with success', async()=>{
      const result = await service.add(courseAddMock)
      
      expect(result).toEqual(courseAddMock)
    })
  })

  describe ('getOneById', ()=>{
    it('should return one course', async() =>{
      const result: CourseEntity = await service.getOneById(2)
      expect(result.id).toEqual(2)

    })
  })

  describe('getAll', ()=>{
    it('should return all coursees', async ()=> {
      const result: CourseEntity[] = await service.getAll()

      expect(result.length).toEqual(courseRepositoryMock.length)
    })
  })

  describe('update', ()=>{
    it('should return update course', async ()=>{
      const result = await service.update(courseUpdateMock)

      expect(result).not.toEqual(courseRepositoryMock[courseUpdateMock.id])
    })
  })

  describe('delete',()=>{
    it('must remove the course from the repository', async ()=>{
      const oldRepository = courseRepositoryMock;

      const result = await service.delete(4)

      expect(result).not.toContainEqual(oldRepository[3])  
    })
  })
});
