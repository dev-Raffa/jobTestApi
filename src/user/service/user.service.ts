import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from '../model/user.entity';
import { Repository } from 'typeorm';
import {
  userAddArgs,
  userDeleteArgs,
  userGetOneByIdArgs,
  userUpdateArgs,
  userValidateArgs
} from '../model/user.args';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(userEntity)
    private repository: Repository<userEntity>
  ) {}

  async add(args: userAddArgs): Promise<userEntity> {
    return await this.repository.save(args);
  }

  async getOneById(args: userGetOneByIdArgs): Promise<userEntity> {
    return await this.repository.findOneBy({ id: args });
  }

  async getAll(): Promise<userEntity[]> {
    return await this.repository.find();
  }

  async update({ id, args }: userUpdateArgs): Promise<userEntity> {
    await this.repository.update(id, {
      ...(args.email && { email: args.email }),
      ...(args.password && { password: args.password }),
      ...(args.uuid && { uuid: args.uuid }),
      ...(args.enrolledInCourses && {
        enrolledInCourses: args.enrolledInCourses
      }),
      ...(args.completedClasses && { completedClasses: args.completedClasses })
    });

    return await this.repository.findOneBy({ id: id });
  }

  async delete(args: userDeleteArgs) {
    return await this.repository.delete(args);
  }

  async validate(args: userValidateArgs): Promise<userEntity> {
    return this.repository.findOneBy({
      email: args.email,
      password: args.password
    });
  }
}
