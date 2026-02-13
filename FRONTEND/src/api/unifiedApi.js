import axios from 'axios';

const isProduction = import.meta.env.MODE === "production";
const BASE_URL = isProduction 
  ? "https://techinsumos-backend.onrender.com/api"
  : "http://localhost:8000/api";

console.log('API Base URL:', BASE_URL, 'Production:', isProduction);

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