import axios from 'axios';

const tasksInstance = axios.create({
  baseURL: import.meta.env.VITE_TASK_MANAGER_BASE_URL,
});

tasksInstance.interceptors.request.use(config => {
  const token: string | null = window.localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

// tasksInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (axios.isAxiosError(error)) {
//       return Promise.reject(error.message);
//     } else {
//       return Promise.reject('Failed to fetch data! Try again!');
//     }
//   }
// );

export default tasksInstance;
