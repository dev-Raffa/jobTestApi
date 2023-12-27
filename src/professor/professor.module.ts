import { Module } from '@nestjs/common';
import { ProfessorService } from './service/professor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorEntity } from './model/professor.entity';
import { ProfessorController } from './controller/professor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorEntity])],
  providers: [ProfessorService],
  exports: [ProfessorService, TypeOrmModule],
  controllers: [ProfessorController],
})
export class ProfessorModule {}
