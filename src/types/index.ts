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

export interface IPokemonApiResponse {
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: Stat[];
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

export interface IUserRegistration {
  name: string;
  email: string;
  password: string;
}

export interface IRegistrationWithConfirm extends IUserRegistration {
  confirmPassword: string;
}

export type UserLoginType = Omit<IUserRegistration, 'name'>;

export type UserCredentialsType = Omit<IUserRegistration, 'password'>;

export interface IAuthResponse {
  user: UserCredentialsType;
  token: string;
}

export interface ITask {
  _id: string;
  text: string;
  completed: boolean;
}
