export interface userAdminUpdateArgs {
  id: number;
  args: {
    user: string;
    password: string;
    uuid?: string;
  };
}

export interface userAdminValidateArgs {
  user: string;
  password: string;
}
