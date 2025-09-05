import { api } from '../config/api';
import { News } from '../types';

export const newsService = {
  async getAll(): Promise<News[]> {
    const response = await api.get('/news');
    return response.data.data;
  },

  async getById(id: number): Promise<News> {
    const response = await api.get(`/news/${id}`);
    return response.data.data;
  },

  async create(news: Omit<News, 'id' | 'created_at' | 'updated_at'>): Promise<News> {
    const response = await api.post('/news', news);
    return response.data.data;
  },

  async update(id: number, news: Partial<News>): Promise<News> {
    const response = await api.put(`/news/${id}`, news);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/news/${id}`);
  },

  async incrementViews(id: number): Promise<void> {
    await api.post(`/news/${id}/view`);
  }
};