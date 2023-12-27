import { IUser } from './user.interface';

export interface userAddArgs {
  email: string;
  password: string;
  enrolledInCourses?: Array<number>;
  completedClasses?: Array<number>;
}

export interface userSaveArgs extends IUser {}

export type userGetOneByIdArgs = number;

interface userArgs extends userAddArgs {
  uuid?: string;
}

export interface userUpdateArgs {
  id: number;
  args: userArgs;
}

export type userDeleteArgs = userGetOneByIdArgs;

export interface userValidateArgs {
  email: string;
  password: string;
}
