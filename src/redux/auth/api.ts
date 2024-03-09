import { createApi } from '@reduxjs/toolkit/query/react';

import { IAuthResponse, IUserRegistration, UserCredentialsType, UserLoginType } from '../../types';
import axiosBaseQuery from '../axiosBaseQuery';
import tasksInstance from '../../axiosApi/tasks';

const ENDPOINT_REFRESH_USER = 'users/current';
const ENDPOINT_SIGN_UP = 'users/register';
const ENDPOINT_LOG_IN = 'users/login';
const ENDPOINT_LOG_OUT = 'users/logout';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(tasksInstance),
  endpoints: builder => ({
    refreshUser: builder.query<UserCredentialsType, void>({
      query: () => ({
        url: ENDPOINT_REFRESH_USER,
        method: 'GET',
      }),
    }),
    signUp: builder.mutation<IAuthResponse, IUserRegistration>({
      query: credentials => ({
        url: ENDPOINT_SIGN_UP,
        method: 'POST',
        data: credentials,
      }),
    }),
    logIn: builder.mutation<IAuthResponse, UserLoginType>({
      query: credentials => ({
        url: ENDPOINT_LOG_IN,
        method: 'POST',
        data: credentials,
      }),
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: ENDPOINT_LOG_OUT,
        method: 'POST',
      }),
    }),
  }),
});

export const { useRefreshUserQuery, useSignUpMutation, useLogInMutation, useLogOutMutation } =
  authApi;

export default authApi;
