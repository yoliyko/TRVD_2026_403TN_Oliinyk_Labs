import api from '../api/axiosConfig';

export const tripService = {
  getAll: () => api.get('/trips'),
  create: (data: any) => api.post('/trips', data),
  delete: (id: string) => api.delete(`/trips/${id}`),
};