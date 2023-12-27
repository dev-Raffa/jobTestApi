import {
  userAdminUpdateArgs,
  userAdminValidateArgs,
} from '../model/user-admin.args';

export const userAdminUpdateMock: userAdminUpdateArgs = {
  id: 1,
  args: { user: 'Admin', password: '123admin456' },
};

export const userAdminValidateSuccessMock: userAdminValidateArgs = {
  user: 'Admin',
  password: '123admin456',
};

export const userAdminValidateFailedMock: userAdminValidateArgs = {
  user: 'Admin',
  password: '123456',
};
