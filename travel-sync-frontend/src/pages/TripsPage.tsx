import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

interface Trip {
  id: string;
  title: string;
  baseCurrency: string;
}

const TripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [newTripTitle, setNewTripTitle] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Отримання списку подорожей (Read)
  const fetchTrips = async () => {
    try {
      const response = await api.get('/trips');
      setTrips(response.data);
    } catch (error) {
      console.error('Помилка при завантаженні:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // 2. Створення нової подорожі (Create)
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTripTitle) return;

    try {
      await api.post('/trips', { title: newTripTitle, baseCurrency: 'UAH' });
      setNewTripTitle(''); // Очистити поле
      fetchTrips(); // Оновити список
    } catch (error) {
      alert('Помилка при створенні');
    }
  };

  // 3. Видалення (Delete)
  const handleDelete = async (id: string) => {
    if (!window.confirm('Ви впевнені?')) return;
    try {
      await api.delete(`/trips/${id}`);
      fetchTrips(); // Оновити список
    } catch (error) {
      alert('Тільки адмін може видаляти (або помилка доступу)');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Мої подорожі 🌍</h1>
        <button onClick={handleLogout} style={{ height: '30px', marginTop: '20px' }}>Вийти</button>
      </div>

      {/* Форма створення */}
      <form onSubmit={handleCreate} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Куди їдемо?" 
          value={newTripTitle}
          onChange={(e) => setNewTripTitle(e.target.value)}
          style={{ padding: '8px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '8px' }}>Додати</button>
      </form>

      {/* Список */}
      {loading ? <p>Завантаження...</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {trips.map(trip => (
            <li key={trip.id} style={{ 
              border: '1px solid #ccc', 
              padding: '10px', 
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              borderRadius: '8px'
            }}>
              <span><strong>{trip.title}</strong> ({trip.baseCurrency})</span>
              <button 
                onClick={() => handleDelete(trip.id)}
                style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Видалити
              </button>
            </li>
          ))}
        </ul>
      )}
      {trips.length === 0 && !loading && <p>Поки що немає подорожей. Створіть першу!</p>}
    </div>
  );
};

export default TripsPage;