import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IClass, classType } from 'src/class/model/class.Interface';
import { ProfessorEntity } from '../../professor/model/professor.entity';
import { CourseEntity } from 'src/course/model/course.entity';

@Entity({ name: 'classes' })
@Unique(['url'])
export class ClassEntity implements IClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: classType;

  @Column()
  url: string;

  @ManyToOne(() => ProfessorEntity, (professor) => professor.classes)
  @JoinColumn({ name: 'professorId', referencedColumnName: 'id' })
  professor: ProfessorEntity;

  @ManyToOne(() => CourseEntity, (course) => course.classes)
  @JoinColumn({ name: 'courseId', referencedColumnName: 'id' })
  course: CourseEntity;
}
