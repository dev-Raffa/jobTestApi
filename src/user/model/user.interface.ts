export interface IUser {
    id: number;
    email: string;
    password: string;
    uuid?: string;
    courses: Array<number>;
}