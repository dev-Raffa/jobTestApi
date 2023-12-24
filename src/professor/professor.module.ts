import { Module } from '@nestjs/common';
import { ProfessorService } from './service/professor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorEntity } from './model/professor.entity';
import { ClassModule } from 'src/class/class.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorEntity]), ClassModule],
  providers: [ProfessorService],
  exports: [ ProfessorService, TypeOrmModule]
})
export class ProfessorModule {}
