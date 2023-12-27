import { Module } from '@nestjs/common';
import { CourseService } from './service/course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from 'src/class/class.module';
import { CourseEntity } from './model/course.entity';
import { CourseController } from './controller/course.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity]), ClassModule],
  providers: [CourseService],
  exports: [CourseService, TypeOrmModule],
  controllers: [CourseController],
})
export class CourseModule {}
