import { UserCredentialsType } from "../../types";

interface InitialState {
  user: UserCredentialsType;
  token: string | null;
  loading: boolean;
  error: null | string;
  isRefreshing: boolean;
}

export const initialState: InitialState = {
  user: { name: '', email: '' },
  token: null,
  isRefreshing: false,
  loading: false,
  error: null,
};
