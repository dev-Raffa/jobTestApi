import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserAdminService } from '../service/user-admin.service';
import {
  userAdminAddArgs,
  userAdminUpdateArgs,
  userAdminValidateArgs,
} from '../model/user-admin.args';

@Controller('admin')
export class UserAdminController {
  constructor(private readonly service: UserAdminService) {}

  @Post()
  add(@Body() admin: userAdminAddArgs) {
    return this.service.save(admin);
  }

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
    return this.service.validate(authAdimn);
  }
}
