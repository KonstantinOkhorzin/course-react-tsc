import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { signUp, logIn, logOut, refreshUser } from '../../services/tasks';
import { IUserRegistration, UserLoginType } from '../../types';
import { initialState } from './initialState';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: create => ({
    signUpThunk: create.asyncThunk(
      async (credentials: IUserRegistration, thunkApi) => {
        try {
          return await signUp(credentials);
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: state => {
          state.loading = true;
        },
        rejected: (state, { payload }) => {
          if (typeof payload === 'string') {
            state.error = payload;
          }
        },
        fulfilled: (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.error = null;
        },
        settled: state => {
          state.loading = false;
        },
      }
    ),
    logInThunk: create.asyncThunk(
      async (credentials: UserLoginType, thunkApi) => {
        try {
          return await logIn(credentials);
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: state => {
          state.loading = true;
        },
        rejected: (state, { payload }) => {
          if (typeof payload === 'string') {
            state.error = payload;
          }
        },
        fulfilled: (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.error = null;
        },
        settled: state => {
          state.loading = false;
        },
      }
    ),
    logOutThunk: create.asyncThunk(
      async (_: void, thunkApi) => {
        try {
          return await logOut();
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: state => {
          state.loading = true;
        },
        rejected: (state, { payload }) => {
          if (typeof payload === 'string') {
            state.error = payload;
          }
        },
        fulfilled: state => {
          state.user = initialState.user;
          state.token = initialState.token;
          state.error = null;
        },
        settled: state => {
          state.loading = false;
        },
      }
    ),
    refreshUserThunk: create.asyncThunk(
      async (_: void, thunkApi) => {
        const state = thunkApi.getState(); //const state: unknown !!!!!!!!!!!
        const { token } = state.auth;

        if (token === null) {
          return thunkApi.rejectWithValue('Unable to fetch user');
        }

        try {
          return await refreshUser(token);
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: state => {
          state.loading = true;
        },
        rejected: (state, { payload }) => {
          if (typeof payload === 'string') {
            state.error = payload;
          }
        },
        fulfilled: (state, { payload }) => {
          state.user = payload;
          state.error = null;
        },
        settled: state => {
          state.loading = false;
        },
      }
    ),
  }),
  selectors: {
    selectIsLoggedIn: state => Boolean(state.token),
    selectIsRefreshing: state => state.isRefreshing,
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const persistedAuth = persistReducer(persistConfig, slice.reducer);

export const { logInThunk, signUpThunk, logOutThunk, refreshUserThunk } = slice.actions;
export const { selectIsLoggedIn, selectIsRefreshing } = slice.selectors;

export default persistedAuth;
