import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClassEntity } from '../model/class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  classAddArgs,
  classDeleteArgs,
  classGetOneByIdArgs,
  classUpdateArgs
} from '../model/class.args';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity)
    private repository: Repository<ClassEntity>
  ) {}

  async add(args: classAddArgs): Promise<ClassEntity> {
    return await this.repository.save(args);
  }

  async getOneById(args: classGetOneByIdArgs): Promise<ClassEntity> {
    return await this.repository.findOneBy({ id: args });
  }

  async getAll(): Promise<ClassEntity[]> {
    return await this.repository.find();
  }

  async update({ id, args }: classUpdateArgs): Promise<ClassEntity> {
    await this.repository.update(id, {
      ...(args.title && { title: args.title }),
      ...(args.description && { description: args.description }),
      ...(args.type && { type: args.type }),
      ...(args.url && { url: args.url }),
      ...(args.professorId && { professorId: args.professorId }),
      ...(args.cursoId && { cursoId: args.cursoId })
    });

    return await this.repository.findOneBy({ id: id });
  }

  async delete(args: classDeleteArgs) {
    return await this.repository.delete(args);
  }
}
