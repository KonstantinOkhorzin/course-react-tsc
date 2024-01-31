import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

import { signUp, logIn, logOut } from '../../services/tasks';
import { IUserRegistration, UserLoginType, UserCredentialsType } from '../../types';

interface InitialState {
  user: UserCredentialsType;
  token: string | null;
  loading: boolean;
  error: null | string;
  isRefreshing: boolean;
}

const initialState: InitialState = {
  user: { name: '', email: '' },
  token: null,
  isRefreshing: false,
  loading: false,
  error: null,
};

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
  }),
  selectors: {
    selectIsLoggedIn: state => Boolean(state.token),
  },
});

export const { logInThunk, signUpThunk, logOutThunk } = slice.actions;
export const { selectIsLoggedIn } = slice.selectors;

export default slice.reducer;
