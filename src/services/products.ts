import axios from 'axios';

import { IProduct, IProductCreationData } from '../types';

const instance = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.message);
    } else {
      return Promise.reject('Failed to fetch data! Try again!');
    }
  }
);

export const getAllProducts = async () => {
  const response = await instance.get<IProduct[]>('/products', {
    params: { offset: 0, limit: 20 },
  });
  return response.data;
};

export const createProduct = async (data: IProductCreationData) => {
  const response = await instance.post<IProduct>('/products', data);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  return (await instance.delete<boolean>(`/products/${id}`)).data;
};
