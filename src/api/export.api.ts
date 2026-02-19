import apiClient from './client';

export const exportApi = {
  // Authenticated: export saved document
  exportDocumentPdf: (id: string) =>
    apiClient.get(`/documents/${id}/export/pdf`, { responseType: 'blob' }),
  exportDocumentHtml: (id: string) =>
    apiClient.get(`/documents/${id}/export/html`, { responseType: 'blob' }),

  // Public: export unsaved document
  exportPdf: (data: { type: string; content: any; serviceInfo: any }) =>
    apiClient.post('/export/pdf', data, { responseType: 'blob' }),
  exportHtml: (data: { type: string; content: any; serviceInfo: any }) =>
    apiClient.post('/export/html', data, { responseType: 'blob' }),
};
