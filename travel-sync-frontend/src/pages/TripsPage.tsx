import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { toast } from 'react-toastify';
import TripDetailsModal from '../components/TripDetailsModal';

interface Activity { id: string; name: string; isCompleted: boolean; }
interface Expense { id: string; title: string; amount: number; }
interface Trip { id: string; title: string; shareId: string; baseCurrency: string; expenses: Expense[]; activities: Activity[]; startDate: string, endDate: string}

const TripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [newTrip, setNewTrip] = useState({ title: '', startDate: '', endDate: '' });
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [adminStats, setAdminStats] = useState<any>(null);

  // СТАН МОДАЛКИ
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

// --- 1. СТАН КАЛЕНДАРЯ (Оголошуємо спочатку) ---
  const [currentDate, setCurrentDate] = useState(new Date()); // Додали setCurrentDate

  // --- 2. ФУНКЦІЇ ПЕРЕМИКАННЯ (Використовують стан) ---
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // --- 3. ОБЧИСЛЕННЯ ДНІВ (Залежать від currentDate) ---
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayIdx = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const getTripsForDay = (day: number) => {
  // Створюємо об'єкт дати для поточної клітинки календаря
  const calendarDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  calendarDate.setHours(0, 0, 0, 0);

  return trips.filter(t => {
    if (!t.startDate || !t.endDate) return false;

    const start = new Date(t.startDate);
    const end = new Date(t.endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    // День підходить, якщо він >= початку І <= кінця
    return calendarDate >= start && calendarDate <= end;
  });
};

  const fetchTrips = async () => {
    try {
      const response = await api.get('/trips');
      setTrips(response.data);
      // Якщо відкрита модалка - оновлюємо дані і в ній
      if (selectedTrip) {
        const updated = response.data.find((t: Trip) => t.id === selectedTrip.id);
        setSelectedTrip(updated);
      }
    } catch { toast.error('Помилка оновлення'); } finally { setLoading(false); }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserRole(payload.role);
      setUserEmail(payload.email);
      if (payload.role === 'admin') api.get('/admin/stats').then(res => setAdminStats(res.data));
    }
    fetchTrips();
  }, []);

  const handleCreateTrip = async (e: React.FormEvent) => {
  e.preventDefault();

  // Маленька валідація: дата кінця не може бути раніше початку
  if (new Date(newTrip.startDate) > new Date(newTrip.endDate)) {
    toast.error("Подорож не може закінчитися раніше, ніж почнеться!");
    return;
  }

  try {
    // Відправляємо об'єкт з startDate та endDate
    await api.post('/trips', {
      title: newTrip.title,
      startDate: newTrip.startDate,
      endDate: newTrip.endDate
    });

    // Очищаємо форму
    setNewTrip({ title: '', startDate: '', endDate: '' });
    fetchTrips();
    toast.success('Подорож на кілька днів додана!');
  } catch (error) {
    toast.error('Помилка створення подорожі');
  }
};

  const stats = trips.reduce((acc, trip) => ({
    money: acc.money + (trip.expenses?.reduce((sum, exp) => sum + Number(exp.amount), 0) || 0),
    totalActs: acc.totalActs + (trip.activities?.length || 0),
    doneActs: acc.doneActs + (trip.activities?.filter(a => a.isCompleted).length || 0)
  }), { money: 0, totalActs: 0, doneActs: 0 });

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <header className="bg-white border-b border-slate-200 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-black text-sky-600">TravelSync 🌍</h1>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase font-bold">{userEmail}</p>
            <button onClick={() => {localStorage.clear(); window.location.href='/login'}} className="text-xs text-red-500 font-bold">Вихід</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        
        {/* DASHBOARD STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-[10px] uppercase font-bold">Загальні витрати</p>
            <p className="text-xl font-black text-sky-600">{stats.money} UAH</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-[10px] uppercase font-bold">Прогрес підготовки</p>
            <p className="text-xl font-black text-emerald-600">{stats.doneActs}/{stats.totalActs}</p>
          </div>
          {userRole === 'admin' && adminStats && (
            <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 shadow-sm">
              <p className="text-rose-400 text-[10px] uppercase font-bold">Глобальні юзери</p>
              <p className="text-xl font-black text-rose-600">{adminStats.totalUsers}</p>
            </div>
          )}
        </div>

        {/* CREATE TRIP FORM (Validation added) */}
        <div className="bg-slate-900 p-6 rounded-3xl mb-8 text-white shadow-xl">
          <form onSubmit={handleCreateTrip} className="flex flex-col lg:flex-row gap-4 items-end">
          {/* Назва */}
            <div className="flex-1 w-full">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 ml-1">Назва подорожі</label>
              <input 
                required 
                minLength={3} 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-sky-500" 
                placeholder="Наприклад: Відпустка в Карпатах 🏔️" 
                value={newTrip.title} 
                onChange={e => setNewTrip({...newTrip, title: e.target.value})} 
              />
            </div>

            {/* Дата Початку */}
            <div className="w-full lg:w-40">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 ml-1">Початок</label>
              <input 
                required 
                type="date" 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 outline-none" 
                value={newTrip.startDate} 
                onChange={e => setNewTrip({...newTrip, startDate: e.target.value})} 
              />
            </div>

            {/* Дата Кінця */}
            <div className="w-full lg:w-40">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 ml-1">Кінець</label>
              <input 
                required 
                type="date" 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 outline-none" 
                value={newTrip.endDate} 
                onChange={e => setNewTrip({...newTrip, endDate: e.target.value})} 
              />
            </div>

            <button type="submit" className="w-full lg:w-auto bg-sky-500 hover:bg-sky-400 px-8 py-2 rounded-xl font-bold transition-all shadow-lg shadow-sky-500/20">
              Запланувати
            </button>
          </form>
        </div>

        {/* CALENDAR VIEW */}
        {/* НАВІГАЦІЯ КАЛЕНДАРЯ */}
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
          >
            ← Попередній
          </button>
  
          <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest">
            🗓 {currentDate.toLocaleString('uk-UA', { month: 'long', year: 'numeric' })}
          </h3>
  
         <button 
            onClick={nextMonth}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
          >
            Наступний →
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map(h => <div key={h} className="text-center text-[10px] font-bold text-slate-400 uppercase py-2">{h}</div>)}
          
          {[...Array(firstDayIdx === 0 ? 6 : firstDayIdx - 1)].map((_, i) => <div key={i} className="h-24 bg-slate-100/50 rounded-xl"></div>)}
          
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const dayTrips = getTripsForDay(day);
            return (
              <div key={day} className="h-24 bg-white border border-slate-100 rounded-xl p-2 relative group hover:border-sky-300 transition-all">
                <span className="text-xs font-bold text-slate-300">{day}</span>
                <div className="mt-1 space-y-1 overflow-y-auto max-h-16 no-scrollbar">
                  {dayTrips.map(t => (
                    <div key={t.id} onClick={() => {setSelectedTrip(t); setIsDetailsOpen(true)}} className="text-[9px] bg-sky-500 text-white p-1 rounded-md truncate cursor-pointer leading-tight">
                      {t.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <TripDetailsModal isOpen={isDetailsOpen} trip={selectedTrip} onClose={() => setIsDetailsOpen(false)} onDataChange={fetchTrips} />
    </div>
  );
};

export default TripsPage;