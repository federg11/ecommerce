import axios from 'axios';

// URL del backend en producción
const API_URL = 'https://techinsumos-backend.onrender.com/api';

console.log('🌐 API Base URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  console.log('📤 Request to:', config.baseURL + config.url);
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.message);
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout - El servidor tardó demasiado en responder');
    }
    if (!error.response) {
      console.error('No response - Verifica la conexión');
    }
    return Promise.reject(error);
  }
);

export default api;