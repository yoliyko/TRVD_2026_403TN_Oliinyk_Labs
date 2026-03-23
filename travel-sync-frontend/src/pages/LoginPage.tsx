import { useState } from 'react'; // Додай useState
import { useForm } from 'react-hook-form';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import RegisterModal from '../components/RegisterModal'; // Імпортуй модалку
import { toast } from 'react-toastify';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  
  // Стан для керування модалкою
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('accessToken', response.data.accessToken);
      navigate('/trips');
      toast.success('Вітаємо в системі!');
      const decodedToken: any = JSON.parse(atob(response.data.accessToken.split('.')[1]));
      localStorage.setItem('userRole', decodedToken.role);
    } catch (error) {
      toast.error('Невірний логін або пароль');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '12px', textAlign: 'center' }}>
      <h1>Вхід 🔑</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email</label>
          <input type="email" {...register('email')} style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Пароль</label>
          <input type="password" {...register('password')} style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Увійти
        </button>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <p>Ще не маєте акаунту?</p>
      <button 
        onClick={() => setIsModalOpen(true)} 
        style={{ padding: '10px 20px', backgroundColor: '#f4f4f4', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer' }}
      >
        Зареєструватися
      </button>

      {/* Сама модалка */}
      <RegisterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default LoginPage;