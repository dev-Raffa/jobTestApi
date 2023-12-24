import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from '../model/course.entity';
import { courseAddArgs, courseDeleteArgs, courseGetOneByIdArgs, courseUpdateArgs } from '../model/course.args';


@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(CourseEntity)
        private repository: Repository<CourseEntity>
    ){}

    async add(args: courseAddArgs): Promise<CourseEntity>{
       return await this.repository.save(args)
    }

    async getOneById(args: courseGetOneByIdArgs): Promise<CourseEntity>{
        return await this.repository.findOneBy({id: args})
    }

    async getAll(): Promise<CourseEntity[]>{
        return await this.repository.find()
    }

    async update(args: courseUpdateArgs): Promise<CourseEntity>{
        await this.repository.update(args.id, {
            ...(args.title &&{title: args.title}),
            ...(args.description &&{description: args.description}),
            ...(args.category &&{category: args.category}),
            ...(args.imageUrl &&{imageUrl: args.imageUrl}),
            ...(args.classes &&{classes: args.classes}),
        })

        return await this.repository.findOneBy({id: args.id})
    }

    async delete(args: courseDeleteArgs){
        return await this.repository.delete(args)
    }
}
