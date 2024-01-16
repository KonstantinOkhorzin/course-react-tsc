import { configureStore } from '@reduxjs/toolkit';

import todos from './todos/slice';

export default configureStore({
  reducer: { todos },
});
