import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ICourse } from "./course.interface";
import { ClassEntity } from "src/class/model/class.entity";

@Entity({name: "courses"})
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
    start_at: Date;
    
    @Column()
    status?: "in progress" | "concluded";
    
    @ManyToMany((type)=> ClassEntity  ,(course)=> CourseEntity)
    classes: Array<ClassEntity['id']>;
}