import { CourseEntity } from "src/course/model/course.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

import { IUser } from "./user.interface";

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
    status: "active" | "suspense" | "inactive";

    @Column()
    uuid: string;

    @ManyToMany((type)=> CourseEntity, (user)=> userEntity)
    courses: Array<CourseEntity['id']>;
}