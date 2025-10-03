import { api } from '../config/api';

export const alumniService = {
  async getAll() {
    const response = await api.get('/alumni');
    return response.data.data;
  },

  async getById(id) {
    const response = await api.get(`/alumni/${id}`);
    return response.data.data;
  },

  async create(alumni) {
    const response = await api.post('/alumni', alumni);
    return response.data.data;
  },

  async update(id, alumni) {
    const response = await api.put(`/alumni/${id}`, alumni);
    return response.data.data;
  },

  async delete(id) {
    await api.delete(`/alumni/${id}`);
  }
};