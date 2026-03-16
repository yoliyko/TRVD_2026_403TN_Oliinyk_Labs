import { useForm } from 'react-hook-form';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
  try {
    // Додаємо лог, щоб побачити що ми шлемо
    console.log('Sending login data:', data); 
    
    const response = await api.post('/auth/login', data);
    console.log('Server response:', response.data);

    // Зберігаємо
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      
      // Даємо браузеру 100мс "перетравити" запис у пам'ять перед переходом
      setTimeout(() => {
        navigate('/trips');
      }, 100);
    }
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    alert('Помилка входу. Перевір консоль.');
  }
};

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h1>Вхід в TravelSync</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email</label>
          <input type="email" {...register('email')} style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Пароль</label>
          <input type="password" {...register('password')} style={{ width: '100%' }} />
        </div>
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default LoginPage;