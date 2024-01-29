import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3030',
  timeout: 3000,
});
axiosInstance.interceptors.response.use(null, (error) => {
  throw error;
});
