import apiClient from './client';

export const documentsApi = {
  create: (data: any) => apiClient.post('/documents', data),
  list: (params?: { type?: string; page?: number; limit?: number }) =>
    apiClient.get('/documents', { params }),
  get: (id: string) => apiClient.get(`/documents/${id}`),
  update: (id: string, data: any) => apiClient.patch(`/documents/${id}`, data),
  delete: (id: string) => apiClient.delete(`/documents/${id}`),
};
