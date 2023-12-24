import { userAddArgs, userUpdateArgs } from "../model/user.args"

export const userAddMock: userAddArgs = {
    email: 'felipe@gmail.com',
    password:'32oi9939999',
}

export const userUpdateMock: userUpdateArgs = {
    ...userAddMock,
    id: 1,
    enrolledInCourses:[1],
    completedClasses:[]
}