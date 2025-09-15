import axios from 'axios';

// Crear instancia de Axios con configuración base
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para agregar token de autenticación
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores comunes
    if (error.response?.status === 401) {
      // Token expirado, redirigir a login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Función genérica para llamadas API
export const apiCall = async (method, url, data = null, config = {}) => {
  try {
    const response = await apiClient({ method, url, data, ...config });
    return { data: response.data, success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
    return { error: errorMessage, success: false };
  }
};

export default apiClient;