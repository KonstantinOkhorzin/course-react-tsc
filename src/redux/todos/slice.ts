import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { ITodo } from '../../types';

const initialState: Array<ITodo> = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<string>) => {
      state.push({ id: nanoid(), text: payload, completed: false });
    },
    deleteTodo: (state, { payload }: PayloadAction<string>) => {
      return state.filter(todo => todo.id !== payload);
    },
    toggleCompleted: (state, { payload }: PayloadAction<string>) => {
      return state.map(todo =>
        todo.id === payload ? { ...todo, completed: !todo.completed } : todo
      );
    },
  },
  selectors: {
    selectTodos: state => state,
  },
});

export const { addTodo, deleteTodo, toggleCompleted } = todosSlice.actions;
export const { selectTodos } = todosSlice.selectors;

export default todosSlice.reducer;
