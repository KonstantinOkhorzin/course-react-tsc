import { configureStore } from '@reduxjs/toolkit';

import todos from './todos/slice';
import pokemon from './pokemon/slice';
import pokemonApi from './pokemon/api';

const store = configureStore({
  reducer: {
    todos,
    pokemon,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
