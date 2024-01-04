import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IUserAdmin } from './user-admin.interface';

@Entity({ name: 'user_admin' })
@Unique(['uuid', 'user'])
export class userAdminEntity implements IUserAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  uuid?: string;
}
