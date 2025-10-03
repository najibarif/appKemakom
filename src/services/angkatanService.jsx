import { api } from '../config/api';

export const angkatanService = {
  async getAll() {
    const response = await api.get('/angkatan');
    return response.data.data;
  },

  async getById(id) {
    const response = await api.get(`/angkatan/${id}`);
    return response.data.data;
  },

  async create(angkatan) {
    const response = await api.post('/angkatan', angkatan);
    return response.data.data;
  },

  async update(id, angkatan) {
    const response = await api.put(`/angkatan/${id}`, angkatan);
    return response.data.data;
  },

  async delete(id) {
    await api.delete(`/angkatan/${id}`);
  }
};