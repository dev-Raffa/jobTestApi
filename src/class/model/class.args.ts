import { IClass, classType } from "./class.Interface";

export interface classAddArgs {
    title: string;
    description: string;
    type: classType;
    url: string;
    professor: number;
}

export interface classSaveArgs extends IClass {}

export type classGetOneByIdArgs = number;

export interface classUpdateArgs extends IClass {}

export type classDeleteArgs = classGetOneByIdArgs; 