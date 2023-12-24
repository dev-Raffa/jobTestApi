import { IProfessor } from "./professor.interface";

export interface professorAddArgs {
    name: string;
    age: string;
    phoneNumber: string;
    email: string;
    subjects: string[];
}

export interface professorSaveArgs extends IProfessor {}

export type professorGetOneByIdArgs = number;

export interface professorUpdateArgs extends IProfessor {}

export type professorDeleteArgs = professorGetOneByIdArgs; 