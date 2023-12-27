import { professorAddArgs, professorUpdateArgs } from '../model/professor.args';

export const professorAddMock: professorAddArgs = {
  name: 'Felipe',
  age: '25',
  email: 'felipe@gmail.com',
  phoneNumber: '32 99999-9999',
  subjects: 'Javascript, React',
};

export const professorUpdateMock: professorUpdateArgs = {
  id: 1,
  args: professorAddMock,
};
