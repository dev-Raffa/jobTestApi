import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IClass } from "./class.Interface";
import { ProfessorEntity } from "src/professor/model/professor.entity";


@Entity({name: 'classes'})
export class ClassEntity implements IClass {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    type: "text" | "vídeo" | "live";

    @Column()
    url: string;
    
    @ManyToOne(()=> ProfessorEntity, ()=> ClassEntity)
    professor: ProfessorEntity['id'];
}