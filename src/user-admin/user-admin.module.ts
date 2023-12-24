import { Module } from '@nestjs/common';
import { UserAdminService } from './user-admin.service';

@Module({
  providers: [UserAdminService]
})
export class UserAdminModule {}
