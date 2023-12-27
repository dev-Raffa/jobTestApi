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

  async update({ id, args }: courseUpdateArgs): Promise<CourseEntity> {
    await this.repository.update(id, {
      ...(args.title && { title: args.title }),
      ...(args.description && { description: args.description }),
      ...(args.category && { category: args.category }),
      ...(args.imageUrl && { imageUrl: args.imageUrl }),
    });

    return await this.repository.findOneBy({ id: id });
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
