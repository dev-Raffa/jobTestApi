import { Module } from '@nestjs/common';
import { ClassService } from './service/class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './model/class.entity';
import { ProfessorModule } from 'src/professor/professor.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity]), ProfessorModule],
  providers: [ClassService],
  exports: [ClassService, TypeOrmModule]
})
export class ClassModule {}
