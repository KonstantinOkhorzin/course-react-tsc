import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

import { getAllTasks, createTask, deleteTask, toggleCompleted } from '../../services/tasks';
import { ITask } from '../../types';

interface InitialState {
  tasks: ITask[];
  loading: boolean;
  error: null | string;
}

const initialState: InitialState = {
  tasks: [],
  loading: false,
  error: null,
};

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: create => ({
    getAllTasksThunk: create.asyncThunk(
      async (_: void, thunkApi) => {
        try {
          return await getAllTasks();
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: state => {
          state.loading = true;
        },
        rejected: (state, { payload }) => {
          if (typeof payload === 'string') {
            state.error = payload;
          }
        },
        fulfilled: (state, { payload }) => {
          state.tasks = payload;
          state.error = null;
        },
        settled: state => {
          state.loading = false;
        },
      }
    ),
    createTaskThunk: create.asyncThunk(
      async (text: string, thunkApi) => {
        try {
          return await createTask(text);
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: state => {
          state.loading = true;
        },
        rejected: (state, { payload }) => {
          if (typeof payload === 'string') {
            state.error = payload;
          }
        },
        fulfilled: (state, { payload }) => {
          state.tasks.push(payload);
          state.error = null;
        },
        settled: state => {
          state.loading = false;
        },
      }
    ),
    deleteTaskThunk: create.asyncThunk(
      async (id: string, thunkApi) => {
        try {
          return await deleteTask(id);
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: state => {
          state.loading = true;
        },
        rejected: (state, { payload }) => {
          if (typeof payload === 'string') {
            state.error = payload;
          }
        },
        fulfilled: (state, { payload }) => {
          state.tasks = state.tasks.filter(task => task.id !== payload.id);
          state.error = null;
        },
        settled: state => {
          state.loading = false;
        },
      }
    ),
    toggleCompletedThunk: create.asyncThunk(
      async (values: Pick<ITask, 'id' | 'completed'>, thunkApi) => {
        try {
          return await toggleCompleted(values);
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: state => {
          state.loading = true;
        },
        rejected: (state, { payload }) => {
          if (typeof payload === 'string') {
            state.error = payload;
          }
        },
        fulfilled: (state, { payload }) => {
          state.tasks = state.tasks.map(task =>
            task.id === payload.id ? { ...task, completed: payload.completed } : task
          );
          state.error = null;
        },
        settled: state => {
          state.loading = false;
        },
      }
    ),
  }),
  selectors: {
    selectTodos: state => state.tasks,
    selectIsLoading: state => state.loading,
    selectError: state => state.error,
  },
});

export const { getAllTasksThunk, createTaskThunk, deleteTaskThunk, toggleCompletedThunk } =
  slice.actions;
export const { selectTodos, selectIsLoading, selectError } = slice.selectors;

export default slice.reducer;
