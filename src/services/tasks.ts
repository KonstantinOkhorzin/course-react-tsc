import axios from 'axios';
import {
  IAuthResponse,
  ITask,
  IUserRegistration,
  UserCredentialsType,
  UserLoginType,
} from '../types';

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
  const { data } = await instance.post<IAuthResponse>('users/signup', credentials);
  setAuthHeader(data.token);

  return data;
};

export const logIn = async (credentials: UserLoginType) => {
  const { data } = await instance.post<IAuthResponse>('users/login', credentials);
  setAuthHeader(data.token);

  return data;
};

export const logOut = async () => {
  await instance.post('users/logout');
  clearAuthHeader();
};

export const refreshUser = async (persistedToken: string) => {
  setAuthHeader(persistedToken);
  return (await instance.get<UserCredentialsType>('users/me')).data;
};

export const getAllTasks = async () => {
  return (await instance.get<ITask[]>('tasks')).data;
};

export const createTask = async (text: string) => {
  return (await instance.post<ITask>('tasks', { text })).data;
};

export const deleteTask = async (id: string) => {
  return (await instance.delete<ITask>(`tasks/${id}`)).data;
};

export const toggleCompleted = async (values: Pick<ITask, 'id' | 'completed'>) => {
  return (await instance.patch<ITask>(`tasks/${values.id}`, values)).data;
};
