import { api } from '../config/api';
import { Modul } from '../types';

export const modulService = {
  async getAll(): Promise<Modul[]> {
    const response = await api.get('/moduls');
    return response.data.data;
  },

  async getById(id: number): Promise<Modul> {
    const response = await api.get(`/moduls/${id}`);
    return response.data.data;
  },

  async create(modul: Omit<Modul, 'id' | 'created_at' | 'updated_at'>): Promise<Modul> {
    const response = await api.post('/moduls', modul);
    return response.data.data;
  },

  async update(id: number, modul: Partial<Modul>): Promise<Modul> {
    const response = await api.put(`/moduls/${id}`, modul);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/moduls/${id}`);
  },

  async download(id: number): Promise<void> {
    await api.post(`/moduls/${id}/download`);
  }
};