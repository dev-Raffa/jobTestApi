import { IUser } from "./user.interface";

export interface userAddArgs {
    email: string;
    password: string;
    enrolledInCourses?: Array<number>;
    completedClasses?: Array<number>;

}

export interface userSaveArgs extends IUser {}

export type userGetOneByIdArgs = number;

export interface userUpdateArgs extends IUser {}

export type userDeleteArgs = userGetOneByIdArgs; 