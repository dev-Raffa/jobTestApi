import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { professorAddArgs, professorDeleteArgs, professorGetOneByIdArgs, professorUpdateArgs } from '../model/professor.args';
import { ProfessorEntity } from '../model/professor.entity';

@Injectable()
export class ProfessorService {
    constructor(
        @InjectRepository(ProfessorEntity)
        private repository: Repository<ProfessorEntity>
    ){}

    async add(args: professorAddArgs): Promise<ProfessorEntity>{
       return await this.repository.save(args)
    }

    async getOneById(args: professorGetOneByIdArgs): Promise<ProfessorEntity>{
        return await this.repository.findOneBy({id: args})
    }

    async getAll(): Promise<ProfessorEntity[]>{
        return await this.repository.find()
    }

    async update(args: professorUpdateArgs): Promise<ProfessorEntity>{
        await this.repository.update(args.id, {
            ...(args.name && {name: args.name}),
            ...(args.age && {age: args.age}),
            ...(args.email && {email: args.email}),
            ...(args.phoneNumber && { phoneNumber: args.phoneNumber}),
            ...(args.subjects && {subjects: args.subjects})
        })
        

        return await this.repository.findOneBy({id: args.id})
    }

    async delete(args: professorDeleteArgs){
        return await this.repository.delete(args)
    }
}
