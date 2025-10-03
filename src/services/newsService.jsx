import { api } from '../config/api';

export const newsService = {
  async getAll() {
    const response = await api.get('/news');
    return response.data.data;
  },

  async getById(id) {
    const response = await api.get(`/news/${id}`);
    return response.data.data;
  },

  async create(news) {
    const response = await api.post('/news', news);
    return response.data.data;
  },

  async update(id, news) {
    const response = await api.put(`/news/${id}`, news);
    return response.data.data;
  },

  async delete(id) {
    await api.delete(`/news/${id}`);
  },

  async incrementViews(id) {
    await api.post(`/news/${id}/view`);
  }
};