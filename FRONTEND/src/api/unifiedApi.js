import axios from 'axios';

const api = axios.create({
  baseURL: 'https://techinsumos-backend.onrender.com/api',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  console.log('📤 Making request to:', config.baseURL + config.url);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.message);
    console.error('Error response:', error.response?.data);
    return Promise.reject(error);
  }
);

export default api;