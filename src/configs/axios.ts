import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
  timeout: 8000,
});
axiosInstance.interceptors.response.use(null, (error) => {
  throw error;
});
