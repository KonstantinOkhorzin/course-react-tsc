import { createApi } from '@reduxjs/toolkit/query/react';

import type { ITask } from '../../types';
import axiosBaseQuery from '../axiosBaseQuery';
import tasksInstance from '../../axiosApi/tasks';

const TASKS_PATH = 'tasks';
const TASKS_TAG = 'Tasks';

const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: axiosBaseQuery(tasksInstance),
  tagTypes: [TASKS_TAG],
  endpoints: builder => ({
    getAllTasks: builder.query<ITask[], void>({
      query: () => ({
        url: TASKS_PATH,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ _id: id }) => ({ type: 'Tasks' as const, id })),
              { type: TASKS_TAG, id: 'LIST' },
            ]
          : [{ type: TASKS_TAG, id: 'LIST' }],
    }),
    deleteTask: builder.mutation<ITask, string>({
      query: id => ({
        url: `${TASKS_PATH}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: TASKS_TAG, id: 'LIST' }],
    }),
    createTask: builder.mutation<ITask, string>({
      query: text => ({
        url: TASKS_PATH,
        method: 'POST',
        data: { text },
      }),
      invalidatesTags: [{ type: TASKS_TAG, id: 'LIST' }],
    }),
    toggleCompleted: builder.mutation<ITask, Pick<ITask, '_id' | 'completed'>>({
      query: ({ _id, completed }) => ({
        url: `${TASKS_PATH}/${_id}/completed`,
        method: 'PATCH',
        data: { completed },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: TASKS_TAG, id: arg._id }],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useToggleCompletedMutation,
} = tasksApi;

export default tasksApi;
