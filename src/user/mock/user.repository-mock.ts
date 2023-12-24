import { userEntity } from "../model/user.entity";

export const userRepositoryMock: userEntity[] = [
    {
        id:1,
        email: 'teste@email.com',
        password: '123654789',
        completedClasses:[1,2],
        enrolledInCourses:[1]    
    }
]