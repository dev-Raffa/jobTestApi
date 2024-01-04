import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete
} from '@nestjs/common';
import { CourseService } from '../service/course.service';
import { courseAddArgs, courseUpdateArgs } from '../model/course.args';

@Controller('course')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @Post()
  async create(@Body() createcourse: courseAddArgs) {
    return await this.service.add(createcourse);
  }

  @Get()
  async findAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.getOneById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatecourse: courseUpdateArgs
  ) {
    return await this.service.update(+id, updatecourse);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.delete(+id);
  }

  @Get(':id/classes')
  async findClass(@Param('id') id: string) {
    return await this.service.getClasses(+id);
  }
}
