import { api } from '../config/api';

export const contactService = {
  async getAll() {
    const response = await api.get('/contacts');
    return response.data.data;
  },

  async getById(id) {
    const response = await api.get(`/contacts/${id}`);
    return response.data.data;
  },

  async create(contact) {
    const response = await api.post('/contacts', contact);
    return response.data.data;
  },

  async update(id, contact) {
    const response = await api.put(`/contacts/${id}`, contact);
    return response.data.data;
  },

  async delete(id) {
    await api.delete(`/contacts/${id}`);
  }
};