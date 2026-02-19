import apiClient from './client';

export const authApi = {
  getMe: () => apiClient.get('/users/me'),
  logout: () => apiClient.post('/auth/logout'),
  refresh: (refreshToken: string) =>
    apiClient.post('/auth/refresh', { refreshToken }),
};
