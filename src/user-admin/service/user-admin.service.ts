import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userAdminEntity } from '../model/user-admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  userAdminAddArgs,
  userAdminUpdateArgs,
  userAdminValidateArgs,
} from '../model/user-admin.args';
import { validateResp } from '../model/user-admin.resp';

@Injectable()
export class UserAdminService {
  constructor(
    @InjectRepository(userAdminEntity)
    private repository: Repository<userAdminEntity>,
  ) {}

  async save(args: userAdminAddArgs): Promise<userAdminEntity> {
    return await this.repository.save(args);
  }

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

  async validate(args: userAdminValidateArgs): Promise<validateResp> {
    const verific = await this.repository.findOneBy({
      user: args.user,
      password: args.password,
    });
    if (verific) {
      return {
        message: 'Success',
        user: verific,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
