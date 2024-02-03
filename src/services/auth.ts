import tasksInstance from '../axiosApi/tasks';
import { IAuthResponse, IUserRegistration, UserCredentialsType, UserLoginType } from '../types';

export const signUp = async (credentials: IUserRegistration) => {
  return (await tasksInstance.post<IAuthResponse>('users/signup', credentials)).data;
};

export const logIn = async (credentials: UserLoginType) => {
  return (await tasksInstance.post<IAuthResponse>('users/login', credentials)).data;
};

export const logOut = async () => {
  await tasksInstance.post('users/logout');
};

export const refreshUser = async () => {
  return (await tasksInstance.get<UserCredentialsType>('users/me')).data;
};
