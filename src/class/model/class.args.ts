import { classType } from 'src/class/model/class.interface';

export interface classAddArgs {
  title: string;
  description: string;
  type: classType;
  url: string;
  professorId?: number;
  cursoId?: number;
}

export interface classSaveArgs extends classAddArgs {
  id: number;
}

export type classGetOneByIdArgs = number;

export interface classUpdateArgs {
  id: number;
  args: classAddArgs;
}

export type classDeleteArgs = classGetOneByIdArgs;
