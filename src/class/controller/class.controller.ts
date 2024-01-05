import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete
} from '@nestjs/common';
import { ClassService } from '../service/class.service';
import { classAddArgs, classUpdateArgs } from '../model/class.args';

@Controller('class')
export class ClassController {
  constructor(private readonly service: ClassService) {}

  @Post()
  create(@Body() createClass: classAddArgs) {
    return this.service.add(createClass);
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
  update(
    @Param('id') id: string,
    @Body() updateClass: classUpdateArgs['args']
  ) {
    return this.service.update({ id: +id, args: updateClass });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
