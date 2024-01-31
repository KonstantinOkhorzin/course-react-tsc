import { configureStore } from '@reduxjs/toolkit';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import todos from './todos/slice';
import pokemon from './pokemon/slice';
import pokemonApi from './pokemon/api';
import productsApi from './products';
import auth from './auth/slice';

export const store = configureStore({
  reducer: {
    todos,
    pokemon,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    auth,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsApi.middleware, pokemonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
