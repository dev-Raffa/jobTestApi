import { Module } from '@nestjs/common';
import { UserAdminController } from './controller/user-admin.controller';
import { UserAdminService } from './service/user-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userAdminEntity } from './model/user-admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([userAdminEntity])],
  providers: [UserAdminService],
  controllers: [UserAdminController],
})
export class UserAdminModule {}
