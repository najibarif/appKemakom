import { api } from '../config/api';

export const modulService = {
  async getAll() {
    const response = await api.get('/moduls');
    return response.data.data;
  },

  async getById(id) {
    const response = await api.get(`/moduls/${id}`);
    return response.data.data;
  },

  async create(modul) {
    const response = await api.post('/moduls', modul);
    return response.data.data;
  },

  async update(id, modul) {
    const response = await api.put(`/moduls/${id}`, modul);
    return response.data.data;
  },

  async delete(id) {
    await api.delete(`/moduls/${id}`);
  },

  async download(id) {
    await api.post(`/moduls/${id}/download`);
  }
};