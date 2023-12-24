import { ProfessorEntity } from "../model/professor.entity";

export const professorRepositoryMock: ProfessorEntity[] = [
    {
        id:1,
        name: 'Gustavo Guanabara',
        age: '32',
        email: 'gustavo.guana@gmail.com',
        phoneNumber: '32 99908-9999',
        classes:[1, 2, 3, 4],
        subjects: ['Python', 'HTML','CSS', 'Lógica']
    }
]