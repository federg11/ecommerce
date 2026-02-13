import axios from 'axios';

// En producción usa el proxy de Vercel (/api), en desarrollo usa localhost
const BASE_URL = import.meta.env.DEV ? 'http://localhost:8000/api' : '/api';

console.log('🌐 API Base URL:', BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
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