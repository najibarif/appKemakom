import { api } from '../config/api';

export const timelineService = {
  async getAll() {
    const response = await api.get('/timeline');
    return response.data.data;
  },

  async getById(id) {
    const response = await api.get(`/timeline/${id}`);
    return response.data.data;
  },

  async create(timeline) {
    const response = await api.post('/timeline', timeline);
    return response.data.data;
  },

  async update(id, timeline) {
    const response = await api.put(`/timeline/${id}`, timeline);
    return response.data.data;
  },

  async delete(id) {
    await api.delete(`/timeline/${id}`);
  }
};