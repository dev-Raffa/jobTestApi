import { ICourse } from "./course.interface";

export interface courseAddArgs {
    title: string;
    description: string;
    imageUrl: string;
    category:string;
    classes: number[];
}

export interface courseSaveArgs extends ICourse {}

export type courseGetOneByIdArgs = number;

export interface courseUpdateArgs extends ICourse {}

export type courseDeleteArgs = courseGetOneByIdArgs; 