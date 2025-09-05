import { api } from '../config/api';
import { Timeline } from '../types';

export const timelineService = {
  async getAll(): Promise<Timeline[]> {
    const response = await api.get('/timeline');
    return response.data.data;
  },

  async getById(id: number): Promise<Timeline> {
    const response = await api.get(`/timeline/${id}`);
    return response.data.data;
  },

  async create(timeline: Omit<Timeline, 'id' | 'created_at' | 'updated_at'>): Promise<Timeline> {
    const response = await api.post('/timeline', timeline);
    return response.data.data;
  },

  async update(id: number, timeline: Partial<Timeline>): Promise<Timeline> {
    const response = await api.put(`/timeline/${id}`, timeline);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/timeline/${id}`);
  }
};