export type classType = 'text'| 'vídeo' | 'live'

export interface IClass {
    id: number;
    title: string;
    description: string;
    type: classType;
    url: string;
    professor: number;
}