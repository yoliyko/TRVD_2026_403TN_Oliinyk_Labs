import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Адреса бекенду
});

// Додаємо токен до кожного запиту
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Перехоплюємо помилки (наприклад, якщо токен протух)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Якщо 401 Unauthorized - видаляємо старий токен і кидаємо на логін
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;