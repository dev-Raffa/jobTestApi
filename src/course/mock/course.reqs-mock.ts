import { courseAddArgs, courseUpdateArgs } from "../model/course.args"

export const courseAddMock: courseAddArgs = {
    title: 'Introdução a Algoritmos',
    description:'Aula do Curso de Algoritmo criado pelo professor Gustavo Guanabara para o portal CursoemVideo.com',
    category: 'Programação',
    imageUrl:'https://www.youtube.com/watch?v=8mei6uVttho',
    classes: [1, 2, 3],
}

export const courseUpdateMock: courseUpdateArgs = {
    ...courseAddMock,
    id: 1,
}