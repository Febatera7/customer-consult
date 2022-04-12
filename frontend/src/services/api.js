import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_PATH
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  if (token) {
    config.headers.email = email;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
