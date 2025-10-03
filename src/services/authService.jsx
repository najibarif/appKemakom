import { api } from '../config/api';

export const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async logout() {
    await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
  },

  async getProfile() {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  async refreshToken() {
    const response = await api.post('/auth/refresh');
    return response.data;
  },

  setToken(token) {
    localStorage.setItem('auth_token', token);
  },

  getToken() {
    return localStorage.getItem('auth_token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};