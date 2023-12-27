import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from './class/class.module';
import { CourseModule } from './course/course.module';
import { ProfessorModule } from './professor/professor.module';
import { UserModule } from './user/user.module';
import { UserAdminModule } from './user-admin/user-admin.module';
import { ClassEntity } from './class/model/class.entity';
import { CourseEntity } from './course/model/course.entity';
import { ProfessorEntity } from './professor/model/professor.entity';
import { userEntity } from './user/model/user.entity';
import { userAdminEntity } from './user-admin/model/user-admin.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: /*process.env.DB_HOST */ 'localhost',
      port: /*parseInt(process.env.DB_PORT)*/ 5433,
      username: /*process.env.DB_USERNAME*/ 'postgres',
      password: /*process.env.DB_PASSWORD*/ 'R@f@1994',
      database: /*process.env.DB_NAME*/ 'testJob',
      entities: [
        ClassEntity,
        CourseEntity,
        ProfessorEntity,
        userEntity,
        userAdminEntity,
      ],
      synchronize: true,
    }),
    ClassModule,
    CourseModule,
    ProfessorModule,
    UserModule,
    UserAdminModule,
  ],
})
export class AppModule {}
