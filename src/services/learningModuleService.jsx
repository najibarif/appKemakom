import { api } from '../config/api';

export const learningModuleService = {
  async getAll() {
    const response = await api.get('/learning-modules');
    return response.data.data;
  },

  async getById(id) {
    const response = await api.get(`/learning-modules/${id}`);
    return response.data.data;
  },

  async create(module) {
    const response = await api.post('/learning-modules', module);
    return response.data.data;
  },

  async update(id, module) {
    const response = await api.put(`/learning-modules/${id}`, module);
    return response.data.data;
  },

  async delete(id) {
    await api.delete(`/learning-modules/${id}`);
  }
};

