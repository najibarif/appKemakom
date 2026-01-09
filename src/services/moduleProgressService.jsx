import { api } from '../config/api';

export const moduleProgressService = {
  async getProgress() {
    const response = await api.get('/module-progress');
    return response.data;
  },

  async updateProgress(data) {
    const response = await api.put('/module-progress', data);
    return response.data;
  },

  async updateModuleProgress(moduleId, data) {
    const response = await api.put(`/module-progress/${moduleId}`, data);
    return response.data;
  },
};

