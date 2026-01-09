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

  async updateProfile(data) {
    const formData = new FormData();
    
    if (data.name) {
      formData.append('name', data.name);
    }
    
    if (data.profile_image) {
      // Ensure we're appending the actual File object
      if (data.profile_image instanceof File) {
        formData.append('profile_image', data.profile_image);
        console.log('FormData - profile_image appended:', {
          name: data.profile_image.name,
          size: data.profile_image.size,
          type: data.profile_image.type,
          isFile: data.profile_image instanceof File
        });
      } else {
        console.error('profile_image is not a File object:', data.profile_image);
        throw new Error('Profile image must be a File object');
      }
    }
    
    // Verify FormData contents before sending
    console.log('FormData contents before sending:');
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }
    
    console.log('Sending FormData to API using POST (better FormData support)...');
    // Use POST instead of PUT for better FormData support
    // Don't set Content-Type header - let browser set it automatically with boundary
    const response = await api.post('/auth/profile', formData);
    console.log('API Response:', response.data);
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