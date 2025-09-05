import { api } from '../config/api';
import { Alumni } from '../types';

export const alumniService = {
  async getAll(): Promise<Alumni[]> {
    const response = await api.get('/alumni');
    return response.data.data;
  },

  async getById(id: number): Promise<Alumni> {
    const response = await api.get(`/alumni/${id}`);
    return response.data.data;
  },

  async create(alumni: Omit<Alumni, 'id' | 'created_at' | 'updated_at'>): Promise<Alumni> {
    const response = await api.post('/alumni', alumni);
    return response.data.data;
  },

  async update(id: number, alumni: Partial<Alumni>): Promise<Alumni> {
    const response = await api.put(`/alumni/${id}`, alumni);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/alumni/${id}`);
  }
};