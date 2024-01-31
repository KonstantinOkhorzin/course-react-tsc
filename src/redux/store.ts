import { configureStore } from '@reduxjs/toolkit';

import todos from './todos/slice';
import pokemon from './pokemon/slice';
import pokemonApi from './pokemon/api';
import productsApi from './products';
import auth from './auth/slice';

const store = configureStore({
  reducer: {
    todos,
    pokemon,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    auth,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productsApi.middleware, pokemonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
