import axios from 'axios';

const tasksInstance = axios.create({
  baseURL: 'https://goit-task-manager.herokuapp.com/',
});

tasksInstance.interceptors.request.use(config => {
  const token: string | null = window.localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

tasksInstance.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.message);
    } else {
      return Promise.reject('Failed to fetch data! Try again!');
    }
  }
);

export default tasksInstance;
