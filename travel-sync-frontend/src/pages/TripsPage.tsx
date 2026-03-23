import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { toast } from 'react-toastify';

// ІНТЕРФЕЙСИ
interface Activity { id: string; name: string; isCompleted: boolean; }
interface Expense { id: string; title: string; amount: number; }
interface Trip { id: string; title: string; baseCurrency: string; expenses: Expense[]; activities: Activity[]; }

const TripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [newTripTitle, setNewTripTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [expenseForm, setExpenseForm] = useState({ tripId: '', title: '', amount: '' });
  const [activityName, setActivityName] = useState({ tripId: '', name: '' });

  // АДМІН-СТАН
  const [adminStats, setAdminStats] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const fetchTrips = async () => {
    try {
      const response = await api.get('/trips');
      setTrips(response.data);
    } catch (error) { 
      toast.error('Помилка завантаження'); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchTrips();
    
    // Дістаємо роль прямо з токена при завантаженні сторінки
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role);
        
        // Якщо адмін - вантажимо глобальну статку
        if (payload.role === 'admin') {
          api.get('/admin/stats').then(res => setAdminStats(res.data));
        }
      } catch (e) {
        console.error("Помилка декодування токена", e);
      }
    }
  }, []);

  // ОБЧИСЛЕННЯ ОСОБИСТОЇ СТАТИСТИКИ
  const stats = trips.reduce((acc, trip) => ({
    money: acc.money + (trip.expenses?.reduce((sum, exp) => sum + Number(exp.amount), 0) || 0),
    totalActs: acc.totalActs + (trip.activities?.length || 0),
    doneActs: acc.doneActs + (trip.activities?.filter(a => a.isCompleted).length || 0)
  }), { money: 0, totalActs: 0, doneActs: 0 });

  // ФУНКЦІЇ ЛОГІКИ
  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTripTitle.trim()) return;
    try {
      await api.post('/trips', { title: newTripTitle, baseCurrency: 'UAH' });
      setNewTripTitle('');
      fetchTrips();
      toast.success('Подорож створена!');
    } catch { toast.error('Помилка'); }
  };

  const handleToggleActivity = async (id: string, currentStatus: boolean) => {
    try {
      await api.patch(`/activities/${id}`, { isCompleted: !currentStatus });
      fetchTrips();
    } catch { toast.error('Помилка'); }
  };

  const handleAddExpense = async (tripId: string) => {
    if (!expenseForm.title || !expenseForm.amount) return;
    try {
      await api.post('/expenses', { title: expenseForm.title, amount: parseFloat(expenseForm.amount), tripId });
      setExpenseForm({ tripId: '', title: '', amount: '' });
      fetchTrips();
    } catch { toast.error('Помилка'); }
  };

  const handleAddActivity = async (tripId: string) => {
    if (!activityName.name.trim()) return;
    try {
      await api.post('/activities', { name: activityName.name, tripId });
      setActivityName({ tripId: '', name: '' });
      fetchTrips();
    } catch { toast.error('Помилка'); }
  };

  const handleLogout = () => { 
    localStorage.removeItem('accessToken'); 
    window.location.href = '/login'; 
  };
  const [userEmail, setUserEmail] = useState<string | null>(null);

useEffect(() => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserRole(payload.role);
      setUserEmail(payload.email); // <--- Зберігаємо email
      if (payload.role === 'admin') {
        api.get('/admin/stats').then(res => setAdminStats(res.data));
      }
    } catch (e) { console.error(e); }
  }
  fetchTrips();
}, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
              TravelSync 🌍
            </h1>
            {userEmail && (
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">
                Залогінений як: <span className="text-slate-600">{userEmail}</span> 
                {userRole === 'admin' && <span className="ml-2 text-rose-500 font-bold">[ADMIN]</span>}
              </p>
            )}
          </div>
    
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout} 
              className="bg-slate-50 text-slate-600 px-5 py-2 rounded-xl text-sm font-bold hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100"
            >
              Вийти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8">

        {/* --- ADMIN PANEL SECTION (Тільки для адмінів) --- */}
        {userRole === 'admin' && adminStats && (
          <section className="mb-10 bg-white border-l-4 border-rose-500 rounded-r-2xl shadow-md p-6">
            <h2 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
              Глобальна статистика системи
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="border-r border-slate-100 last:border-0">
                <p className="text-slate-400 text-xs uppercase font-bold">Користувачів</p>
                <p className="text-3xl font-black text-slate-700">{adminStats.totalUsers}</p>
              </div>
              <div className="border-r border-slate-100 last:border-0">
                <p className="text-slate-400 text-xs uppercase font-bold">Всіх поїздок</p>
                <p className="text-3xl font-black text-slate-700">{adminStats.totalTrips}</p>
              </div>
              <div className="border-r border-slate-100 last:border-0">
                <p className="text-slate-400 text-xs uppercase font-bold">Загальний оборот</p>
                <p className="text-3xl font-black text-rose-600">{adminStats.totalMoney} <span className="text-sm">UAH</span></p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold">Стан API</p>
                <p className="text-emerald-500 font-bold flex items-center gap-1 mt-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> {adminStats.systemStatus}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* STATS (Personal Dashboard) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Мій бюджет</p>
            <h3 className="text-3xl font-bold text-sky-600 mt-1">{stats.money.toFixed(0)} <span className="text-lg font-normal">UAH</span></h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Мій прогрес</p>
            <h3 className="text-3xl font-bold text-emerald-600 mt-1">{stats.doneActs} / {stats.totalActs}</h3>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all duration-700" style={{ width: `${(stats.doneActs / stats.totalActs) * 100 || 0}%` }}></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Мої поїздки</p>
            <h3 className="text-3xl font-bold text-amber-600 mt-1">{trips.length}</h3>
          </div>
        </div>

        {/* CREATE TRIP FORM */}
        <div className="bg-slate-900 p-8 rounded-3xl shadow-xl mb-12 text-white transform hover:scale-[1.01] transition-transform">
          <h2 className="text-xl font-semibold mb-4">Куди їдемо далі?</h2>
          <form onSubmit={handleCreateTrip} className="flex flex-col sm:flex-row gap-4">
            <input 
              value={newTripTitle} onChange={(e) => setNewTripTitle(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-white/30"
              placeholder="Наприклад: Вікенд у Кракові 🏰"
            />
            <button type="submit" className="bg-sky-500 hover:bg-sky-400 px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-sky-500/20">
              Створити
            </button>
          </form>
        </div>

        {/* TRIPS LIST */}
        <div className="grid grid-cols-1 gap-10">
          {loading ? (
            <div className="text-center py-20 text-slate-400 animate-pulse">З'єднання з сервером Docker...</div>
          ) : trips.map(trip => (
            <div key={trip.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden group">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800">📍 {trip.title}</h2>
                <button 
                  onClick={() => api.delete(`/trips/${trip.id}`).then(fetchTrips)} 
                  className="text-slate-300 hover:text-red-500 transition-colors text-sm font-medium"
                >
                  Видалити подорож
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {/* EXPENSES */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xs font-bold text-sky-600 uppercase tracking-widest">💰 Витрати</h4>
                    <span className="text-xs bg-sky-50 text-sky-700 px-2 py-1 rounded-full font-bold">
                       {trip.expenses?.reduce((s, e) => s + Number(e.amount), 0).toFixed(0)} UAH
                    </span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {trip.expenses?.map(exp => (
                      <div key={exp.id} className="flex justify-between text-sm py-2 group/item">
                        <span className="text-slate-600">{exp.title}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-slate-800">{exp.amount}</span>
                          <button onClick={() => api.delete(`/expenses/${exp.id}`).then(fetchTrips)} className="text-slate-200 hover:text-red-400">✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-2">
                    <input 
                      placeholder="Що купили?" className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:bg-white transition-all outline-none focus:ring-1 focus:ring-sky-500"
                      value={expenseForm.tripId === trip.id ? expenseForm.title : ''}
                      onChange={(e) => setExpenseForm({...expenseForm, tripId: trip.id, title: e.target.value})}
                    />
                    <input 
                      type="number" placeholder="Сума" className="w-20 text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:bg-white transition-all outline-none focus:ring-1 focus:ring-sky-500"
                      value={expenseForm.tripId === trip.id ? expenseForm.amount : ''}
                      onChange={(e) => setExpenseForm({...expenseForm, tripId: trip.id, amount: e.target.value})}
                    />
                    <button onClick={() => handleAddExpense(trip.id)} className="bg-sky-500 text-white w-8 h-8 rounded-lg shadow-md shadow-sky-200">+</button>
                  </div>
                </div>

                {/* PLANS */}
                <div className="p-6 bg-slate-50/20">
                  <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-6">📝 План дій</h4>
                  <div className="space-y-3">
                    {trip.activities?.map(act => (
                      <div key={act.id} className="flex items-center gap-3 group/act">
                        <input 
                          type="checkbox" checked={act.isCompleted} 
                          onChange={() => handleToggleActivity(act.id, act.isCompleted)}
                          className="w-5 h-5 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className={`text-sm flex-1 transition-all ${act.isCompleted ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                          {act.name}
                        </span>
                        <button onClick={() => api.delete(`/activities/${act.id}`).then(fetchTrips)} className="text-slate-200 hover:text-rose-400 opacity-0 group-hover/act:opacity-100 transition-opacity">🗑️</button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-2">
                    <input 
                      placeholder="Додати завдання..." className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-emerald-500"
                      value={activityName.tripId === trip.id ? activityName.name : ''}
                      onChange={(e) => setActivityName({tripId: trip.id, name: e.target.value})}
                    />
                    <button onClick={() => handleAddActivity(trip.id)} className="bg-emerald-500 text-white w-8 h-8 rounded-lg shadow-md shadow-emerald-200">+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TripsPage;