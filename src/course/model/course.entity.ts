import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ICourse } from './course.interface';
import { ClassEntity } from '../../class/model/class.entity';

@Entity({ name: 'courses' })
export class CourseEntity implements ICourse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  category: string;

  @Column()
  highlight: boolean;

  @OneToMany(() => ClassEntity, (lesson) => lesson.course)
  classes: ClassEntity[];
}
