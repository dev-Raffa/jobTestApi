import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IUserAdmin } from "./user-admin.interface";

@Entity({name: 'user_admin'})
export class userAdminEntity implements IUserAdmin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user: string;

    @Column()
    password: string;

    @Column()
    uuid?: string;
}