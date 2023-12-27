import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import {
  userAddArgs,
  userUpdateArgs,
  userValidateArgs,
} from '../model/user.args';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() createuser: userAddArgs) {
    return this.service.add(createuser);
  }

  @Get()
  findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.getOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateuser: userUpdateArgs['args']) {
    return this.service.update({ id: +id, args: updateuser });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @Post('auth')
  auth(@Body() authUser: userValidateArgs) {
    this.service.validate(authUser);
  }
}
