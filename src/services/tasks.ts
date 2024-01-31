import axios from 'axios';
import { IAuthResponse, IUserRegistration, UserLoginType } from '../types';

const instance = axios.create({
  baseURL: 'https://goit-task-manager.herokuapp.com/',
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

// instance.interceptors.request.use(config => {
//   const token: string | null = window.localStorage.getItem('token');
//   config.headers.Authorization = token ? `Bearer ${token}` : '';

//   return config;
// });

const setAuthHeader = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = '';
};

export const signUp = async (credentials: IUserRegistration) => {
  const { data } = await instance.post<IAuthResponse>('/users/signup', credentials);
  setAuthHeader(data.token);

  return data;
};

export const logIn = async (credentials: UserLoginType) => {
  const { data } = await instance.post<IAuthResponse>('/users/login', credentials);
  setAuthHeader(data.token);

  return data;
};

export const logOut = async () => {
  await instance.post('/users/logout');
  clearAuthHeader();
};
