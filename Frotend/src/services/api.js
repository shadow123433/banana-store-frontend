import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// Este bloco intercepta TODA requisição antes dela sair para o servidor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Pega o token do bolso
  
  if (token) {
    // Adiciona o cabeçalho Authorization: Bearer <seu_token>
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;