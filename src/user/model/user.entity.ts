import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { CourseEntity } from "../../course/model/course.entity";
import { IUser } from "./user.interface";
import { ClassEntity } from "../../class/model/class.entity";

@Entity({name: "users"})
@Unique(['email', 'uuid']) 
export class userEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    uuid?: string;

    @ManyToMany((type)=> CourseEntity, (user)=> userEntity)
    enrolledInCourses: Array<CourseEntity['id']>;

    @ManyToMany((type)=> ClassEntity, (user)=> userEntity)
    completedClasses: Array<ClassEntity['id']>;
}