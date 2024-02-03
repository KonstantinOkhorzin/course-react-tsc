import { UserCredentialsType } from "../../types";

interface InitialState {
  user: UserCredentialsType;
  isLoggedIn: boolean;
  loading: boolean;
  error: null | string;
  isRefreshing: boolean;
}

export const initialState: InitialState = {
  user: { name: '', email: '' },
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: null,
};
