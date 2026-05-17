import axios from 'axios';

// 🔗 instancia base da API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000 // evita requisição travada
});

// 🔐 interceptor de requisição (envia token automaticamente)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🚨 interceptor de resposta (tratamento global de erro)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se token expirou ou inválido
    if (error.response?.status === 401) {
      console.warn('Sessão expirada. Fazendo logout automático.');

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // redireciona para login
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;