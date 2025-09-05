import { api } from '../config/api';
import { Angkatan } from '../types';

export const angkatanService = {
  async getAll(): Promise<Angkatan[]> {
    const response = await api.get('/angkatan');
    return response.data.data;
  },

  async getById(id: number): Promise<Angkatan> {
    const response = await api.get(`/angkatan/${id}`);
    return response.data.data;
  },

  async create(angkatan: Omit<Angkatan, 'id' | 'created_at' | 'updated_at'>): Promise<Angkatan> {
    const response = await api.post('/angkatan', angkatan);
    return response.data.data;
  },

  async update(id: number, angkatan: Partial<Angkatan>): Promise<Angkatan> {
    const response = await api.put(`/angkatan/${id}`, angkatan);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/angkatan/${id}`);
  }
};