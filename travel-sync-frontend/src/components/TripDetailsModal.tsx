import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { toast } from 'react-toastify';

interface Props {
  trip: any;
  isOpen: boolean;
  onClose: () => void;
  onDataChange: () => void;
}

const TripDetailsModal = ({ trip, isOpen, onClose, onDataChange }: Props) => {
  const [expenseForm, setExpenseForm] = useState({ title: '', amount: '' });
  const [activityName, setActivityName] = useState('');

  if (!isOpen || !trip) return null;

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/expenses', { ...expenseForm, amount: Number(expenseForm.amount), tripId: trip.id });
      setExpenseForm({ title: '', amount: '' });
      onDataChange();
      toast.success('Витрату додано');
    } catch { toast.error('Помилка валідації на сервері'); }
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/activities', { name: activityName, tripId: trip.id });
      setActivityName('');
      onDataChange();
    } catch { toast.error('Помилка валідації'); }
  };

  const copyShareLink = () => {
    const url = `${window.location.origin}/share/${trip.shareId}`;
    navigator.clipboard.writeText(url);
    toast.info('Посилання для шерингу скопійовано!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">📍 {trip.title}</h2>
            <button onClick={copyShareLink} className="text-sky-600 text-xs font-bold uppercase mt-1 hover:underline">🔗 Поділитися (Read-only)</button>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* ВИТРАТИ */}
          <section>
            <h4 className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-4">💰 Витрати</h4>
            <div className="space-y-3">
              {trip.expenses?.map((exp: any) => (
                <div key={exp.id} className="flex justify-between text-sm border-b border-slate-50 pb-2">
                  <span>{exp.title}</span>
                  <span className="font-bold">{exp.amount} UAH</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleAddExpense} className="mt-6 flex gap-2">
              <input required placeholder="Назва" className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2" value={expenseForm.title} onChange={e => setExpenseForm({...expenseForm, title: e.target.value})} />
              <input required type="number" min="0.01" step="0.01" placeholder="Сума" className="w-20 text-xs border border-slate-200 rounded-lg px-3 py-2" value={expenseForm.amount} onChange={e => setExpenseForm({...expenseForm, amount: e.target.value})} />
              <button type="submit" className="bg-sky-500 text-white px-3 rounded-lg">+</button>
            </form>
          </section>

          {/* ПЛАНИ */}
          <section>
            <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">📝 Чек-лист</h4>
            <div className="space-y-3">
              {trip.activities?.map((act: any) => (
                <div key={act.id} className="flex items-center gap-3">
                  <input type="checkbox" checked={act.isCompleted} onChange={() => api.patch(`/activities/${act.id}`, { isCompleted: !act.isCompleted }).then(onDataChange)} />
                  <span className={`text-sm ${act.isCompleted ? 'line-through text-slate-400' : ''}`}>{act.name}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleAddActivity} className="mt-6 flex gap-2">
              <input required placeholder="Додати план..." className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2" value={activityName} onChange={e => setActivityName(e.target.value)} />
              <button type="submit" className="bg-emerald-500 text-white px-3 rounded-lg">+</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsModal;