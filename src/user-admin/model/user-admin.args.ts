export interface userAdminAddArgs {
  user: string;
  password: string;
}

export interface userAdminUpdateArgs {
  id: number;
  args: {
    user: string;
    password: string;
    uuid?: string;
  };
}

export interface userAdminValidateArgs extends userAdminAddArgs {}
