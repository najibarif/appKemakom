import { api } from '../config/api';
import { Contact } from '../types';

export const contactService = {
  async getAll(): Promise<Contact[]> {
    const response = await api.get('/contacts');
    return response.data.data;
  },

  async getById(id: number): Promise<Contact> {
    const response = await api.get(`/contacts/${id}`);
    return response.data.data;
  },

  async create(contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>): Promise<Contact> {
    const response = await api.post('/contacts', contact);
    return response.data.data;
  },

  async update(id: number, contact: Partial<Contact>): Promise<Contact> {
    const response = await api.put(`/contacts/${id}`, contact);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/contacts/${id}`);
  }
};