export interface IUser {
  id: number;
  email: string;
  password: string;
  uuid?: string;
  enrolledInCourses?: Array<number>;
  completedClasses?: Array<number>;
}
