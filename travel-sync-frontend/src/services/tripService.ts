import api from '../api/axiosConfig';

export const tripService = {
  // Для поїздок
  getAll: () => api.get('/trips'),
  create: (data: { title: string; baseCurrency: string }) => api.post('/trips', data),
  delete: (id: string) => api.delete(`/trips/${id}`),
  
  // Для витрат
  addExpense: (data: { title: string; amount: number; tripId: string }) => 
    api.post('/expenses', data),
  deleteExpense: (id: string) => api.delete(`/expenses/${id}`),

  //Для планів
  addActivity: (data: { name: string; tripId: string }) => 
    api.post('/activities', data),
    
  toggleActivity: (id: string, isCompleted: boolean) => 
    api.patch(`/activities/${id}`, { isCompleted }), // Оновлення статусу (V)
    
  deleteActivity: (id: string) => 
    api.delete(`/activities/${id}`),
};