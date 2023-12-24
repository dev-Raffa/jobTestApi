import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IProfessor } from "./professor.interface";
import { ClassEntity } from "src/class/model/class.entity";

@Entity({name:'professors'})
@Unique(['email'])
export class ProfessorEntity implements IProfessor{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    age: string;

    @Column()
    email: string;
    
    @Column()
    phoneNumber: string;
    
    @Column()
    sbjects?: string;

    @OneToMany(()=> ClassEntity,()=>ProfessorEntity)
    classes?: Array<ClassEntity['id']>;
}