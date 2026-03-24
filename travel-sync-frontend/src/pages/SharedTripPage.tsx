import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SharedTripPage = () => {
  const { shareId } = useParams();
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/trips/share/${shareId}`) //axios без токену
      .then(res => setTrip(res.data));
  }, [shareId]);

  if (!trip) return <div className="p-20 text-center">Завантаження подорожі...</div>;

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-black">📍 {trip.title}</h1>
      <p className="text-slate-400">Цією подорожжю з вами поділилися (Read-only)</p>
      
      <div className="mt-10 grid grid-cols-2 gap-10">
        <div>
          <h4 className="font-bold text-sky-600 uppercase text-xs mb-4">💰 Витрати</h4>
          {trip.expenses.map((e: any) => (
            <div key={e.id} className="flex justify-between py-2 border-b">{e.title} <b>{e.amount} UAH</b></div>
          ))}
        </div>
        <div>
          <h4 className="font-bold text-emerald-600 uppercase text-xs mb-4">📝 План</h4>
          {trip.activities.map((a: any) => (
            <div key={a.id} className="flex gap-2 py-2">
              <input type="checkbox" checked={a.isCompleted} readOnly />
              <span className={a.isCompleted ? 'line-through text-slate-400' : ''}>{a.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SharedTripPage;