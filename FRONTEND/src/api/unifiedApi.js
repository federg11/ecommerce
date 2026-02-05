import axios from 'axios';

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:8000/api" 
  : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export default api;