import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IUserAdmin } from "./user-admin.interface";

@Entity()
export class userAdminEntity implements IUserAdmin {
    @Column()
    user: string;

    @Column()
    password: string;

    @Column()
    uuid?: string;
}