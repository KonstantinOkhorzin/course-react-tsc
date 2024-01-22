import { configureStore } from '@reduxjs/toolkit';

import todos from './todos/slice';
import pokemon from './pokemon/slice';
import products from './products';

const store = configureStore({
  reducer: { todos, pokemon, products },
});

export type AppDispatch = typeof store.dispatch;

export default store;
