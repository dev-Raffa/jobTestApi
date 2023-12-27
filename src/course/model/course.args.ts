export interface courseAddArgs {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface courseSaveArgs extends courseAddArgs {
  id: number;
}

export type courseGetOneByIdArgs = number;

export interface courseUpdateArgs {
  id: number;
  args: courseAddArgs;
}

export type courseDeleteArgs = courseGetOneByIdArgs;
