//type courseStatus = 'in progress' | 'concluded';

export interface ICourse {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}
