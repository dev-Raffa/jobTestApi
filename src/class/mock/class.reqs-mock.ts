import { classAddArgs, classUpdateArgs } from "../model/class.args";

export const classAddMock: classAddArgs = {
    title: 'Introdução a Algoritmos',
    description:'Aula do Curso de Algoritmo criado pelo professor Gustavo Guanabara para o portal CursoemVideo.com',
    type: 'vídeo',
    url:'https://www.youtube.com/watch?v=8mei6uVttho',
    professor: 2
}

export const classUpdateMock: classUpdateArgs = {
    ...classAddMock,
    id: 1,
}