import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserAdminService } from '../service/user-admin.service';
import {
  userAdminUpdateArgs,
  userAdminValidateArgs,
} from '../model/user-admin.args';

@Controller('admin')
export class UserAdminController {
  constructor(private readonly service: UserAdminService) {}

  @Get()
  find() {
    return this.service.get();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAdmin: userAdminUpdateArgs['args'],
  ) {
    return this.service.update({ id: +id, args: updateUserAdmin });
  }

  @Post('auth')
  auth(@Body() authAdimn: userAdminValidateArgs) {
    this.service.validate(authAdimn);
  }
}
