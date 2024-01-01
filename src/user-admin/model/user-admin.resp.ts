import { IUserAdmin } from './user-admin.interface';

export interface validateResp {
  message: string;
  user?: IUserAdmin;
}
