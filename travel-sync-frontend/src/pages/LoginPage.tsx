import { useForm } from 'react-hook-form';
import api from '../api/axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import RegisterModal from '../components/RegisterModal';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Редирект залогіненого юзера
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/trips');
    }
  }, [navigate]);

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('accessToken', response.data.accessToken);
      // Роль збережеться автоматично при завантаженні TripsPage
      navigate('/trips');
      toast.success('Успішний вхід!');
    } catch (error) {
      toast.error('Помилка авторизації');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-black text-sky-600 mb-2">TravelSync</h1>
        <p className="text-slate-400 mb-8 uppercase text-[10px] font-bold tracking-widest">Вхід у систему</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
            <input type="email" {...register('email')} required className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Пароль</label>
            <input type="password" {...register('password')} required className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none" />
          </div>
          <button type="submit" className="w-full bg-sky-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all">Увійти</button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-500 mb-4">Ще не з нами?</p>
          <button onClick={() => setIsModalOpen(true)} className="text-sky-600 font-bold hover:underline">Створити акаунт мандрівника</button>
        </div>
      </div>
      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LoginPage;