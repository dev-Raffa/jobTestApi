import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProfessorService } from '../service/professor.service';
import { professorAddArgs, professorUpdateArgs } from '../model/professor.args';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly service: ProfessorService) {}

  @Post()
  create(@Body() createprofessor: professorAddArgs) {
    return this.service.add(createprofessor);
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
    @Body() updateprofessor: professorUpdateArgs['args'],
  ) {
    return this.service.update({ id: +id, args: updateprofessor });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
