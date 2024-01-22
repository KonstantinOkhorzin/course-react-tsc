export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface IPokemon {
  name: string;
  src: string;
  stats: Stat[];
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface IProductCreationData
  extends Pick<IProduct, 'title' | 'price' | 'description' | 'images'> {
  categoryId: number;
}
