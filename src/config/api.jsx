import axios from 'axios';

// API base configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  // Show loading indicator if needed
  // You can add a loading state management here
  
  // Add auth token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Don't set Content-Type for FormData, let browser set it with boundary
  if (config.data instanceof FormData) {
    // Remove Content-Type header completely for FormData
    delete config.headers['Content-Type'];
    // Log FormData contents for debugging
    console.log('Sending FormData:', {
      hasProfileImage: config.data.has('profile_image'),
      hasName: config.data.has('name'),
      entries: Array.from(config.data.entries()).map(([key, value]) => ({
        key,
        value: value instanceof File ? {
          name: value.name,
          size: value.size,
          type: value.type
        } : value
      }))
    });
  }
  
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);