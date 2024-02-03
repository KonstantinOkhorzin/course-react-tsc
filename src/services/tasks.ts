import tasksInstance from '../axiosApi/tasks';
import { ITask } from '../types';

export const getAllTasks = async () => {
  return (await tasksInstance.get<ITask[]>('tasks')).data;
};

export const createTask = async (text: string) => {
  return (await tasksInstance.post<ITask>('tasks', { text })).data;
};

export const deleteTask = async (id: string) => {
  return (await tasksInstance.delete<ITask>(`tasks/${id}`)).data;
};

export const toggleCompleted = async (values: Pick<ITask, 'id' | 'completed'>) => {
  return (await tasksInstance.patch<ITask>(`tasks/${values.id}`, values)).data;
};
