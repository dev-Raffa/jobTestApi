import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from '../model/course.entity';
import {
  courseAddArgs,
  courseDeleteArgs,
  courseGetOneByIdArgs,
  courseUpdateArgs,
} from '../model/course.args';
import { ClassEntity } from 'src/class/model/class.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private repository: Repository<CourseEntity>,
  ) {}

  async add(args: courseAddArgs): Promise<CourseEntity> {
    return await this.repository.save(args);
  }

  async getOneById(args: courseGetOneByIdArgs): Promise<CourseEntity> {
    return await this.repository.findOneBy({ id: args });
  }

  async getAll(): Promise<CourseEntity[]> {
    return await this.repository.find();
  }

  async update(id: number, args: courseUpdateArgs): Promise<CourseEntity> {
    let course = await this.repository.findOneBy({ id: id });

    course = { ...course, ...args };

    return await this.repository.update(id, course).then(() => {
      return course;
    });
  }

  async delete(args: courseDeleteArgs) {
    return await this.repository.delete(args);
  }

  async getClasses(id: number): Promise<ClassEntity[]> {
    const resp: CourseEntity = await this.repository.findOne({
      where: { id: id },
      relations: ['classes'],
    });

    return resp.classes;
  }
}
