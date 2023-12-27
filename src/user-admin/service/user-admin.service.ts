import { Injectable } from '@nestjs/common';
import { userAdminEntity } from '../model/user-admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  userAdminUpdateArgs,
  userAdminValidateArgs,
} from '../model/user-admin.args';

@Injectable()
export class UserAdminService {
  constructor(
    @InjectRepository(userAdminEntity)
    private repository: Repository<userAdminEntity>,
  ) {}

  async get(): Promise<userAdminEntity> {
    const userAdmin = await this.repository.find();

    return userAdmin[0];
  }

  async update({ id, args }: userAdminUpdateArgs): Promise<userAdminEntity> {
    await this.repository.update(id, {
      ...(args.user && { user: args.user }),
      ...(args.password && { password: args.password }),
      ...(args.uuid && { uuid: args.uuid }),
    });

    const userAdmin = await this.repository.find();

    return userAdmin[0];
  }

  async validate(args: userAdminValidateArgs): Promise<userAdminEntity> {
    return this.repository.findOneBy({
      user: args.user,
      password: args.password,
    });
  }
}
