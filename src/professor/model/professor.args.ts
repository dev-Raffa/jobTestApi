export interface professorAddArgs {
  name: string;
  age: string;
  phoneNumber: string;
  email: string;
  subjects: string;
}

export interface professorSaveArgs extends professorAddArgs {
  id: number;
}

export type professorGetOneByIdArgs = number;

export interface professorUpdateArgs {
  id: number;
  args: professorAddArgs;
}

export type professorDeleteArgs = professorGetOneByIdArgs;
