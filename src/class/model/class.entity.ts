import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IClass, classType } from "./class.Interface";
import { ProfessorEntity } from "../../professor/model/professor.entity";


@Entity({name: 'classes'})
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
    
    @ManyToOne(()=> ProfessorEntity, ()=> ClassEntity)
    professor: ProfessorEntity['id'];
}