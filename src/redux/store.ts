import { configureStore } from '@reduxjs/toolkit';

import todos from './todos/slice';
import pokemon from './pokemon/slice';

const store = configureStore({
  reducer: { todos, pokemon },
});

export type AppDispatch = typeof store.dispatch;

export default store;