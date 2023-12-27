import {
  userAddArgs,
  userUpdateArgs,
  userValidateArgs,
} from '../model/user.args';

export const userAddMock: userAddArgs = {
  email: 'felipe@gmail.com',
  password: '32oi9939999',
};

export const userUpdateMock: userUpdateArgs = {
  id: 1,
  args: {
    ...userAddMock,
    enrolledInCourses: [1],
    completedClasses: [],
  },
};

export const userValidateSuccessMock: userValidateArgs = {
  email: 'teste@email.com',
  password: '123654789',
};

export const userValidateFailMock: userValidateArgs = {
  email: 'felipe@gmail.com',
  password: '12345678',
};
