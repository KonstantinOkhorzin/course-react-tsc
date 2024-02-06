import { createSlice } from '@reduxjs/toolkit';

import { UserCredentialsType } from '../../types';

interface InitialState {
  userCredentials: UserCredentialsType;
}

const initialState: InitialState = {
  userCredentials: { name: '', email: '' },
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: create => ({
    setUserCredentials: create.reducer<UserCredentialsType>((state, { payload }) => {
      state.userCredentials = payload;
    }),
    clearUserCredentials: create.reducer<void>(state => {
      state.userCredentials = initialState.userCredentials;
    }),
  }),
  selectors: {
    selectIsLoggedIn: state => Boolean(state.userCredentials.email),
  },
});

export const { setUserCredentials, clearUserCredentials } = slice.actions;
export const { selectIsLoggedIn } = slice.selectors;

export default slice.reducer;
