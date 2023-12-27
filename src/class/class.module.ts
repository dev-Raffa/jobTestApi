import { Module } from '@nestjs/common';
import { ClassService } from './service/class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './model/class.entity';
import { ClassController } from './controller/class.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity])],
  providers: [ClassService],
  exports: [ClassService, TypeOrmModule],
  controllers: [ClassController],
})
export class ClassModule {}
