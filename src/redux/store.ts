import { configureStore } from '@reduxjs/toolkit';

import tasksApi from './tasks/api';
import pokemon from './pokemon/slice';
import pokemonApi from './pokemon/api';
import productsApi from './products';
import auth from './auth/slice';

const store = configureStore({
  reducer: {
    pokemon,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    auth,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      pokemonApi.middleware,
      tasksApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

export default store;
