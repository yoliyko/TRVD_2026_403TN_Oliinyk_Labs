import { useForm } from 'react-hook-form';
import api from '../api/axiosConfig';
import { toast } from 'react-toastify';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal = ({ isOpen, onClose }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Якщо модалка закрита - нічого не малюємо
  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    try {
      await api.post('/auth/register', data);
      toast.success('Реєстрація успішна! Тепер ви можете увійти.');
      reset(); // Очистити поля
      onClose(); // Закрити модалку
    } catch (error: any) {
      const message = error.response?.data?.message || 'Помилка реєстрації';
      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Реєстрація 📝</h2>
          <button onClick={onClose} style={closeButtonStyle}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label>Email</label>
            <input 
              type="email" 
              {...register('email', { required: 'Email обов’язковий' })} 
              style={inputStyle} 
            />
            {errors.email && <p style={errorStyle}>{errors.email.message as string}</p>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Пароль (мін. 6 символів)</label>
            <input 
              type="password" 
              {...register('password', { 
                required: 'Пароль обов’язковий', 
                minLength: { value: 6, message: 'Мінімум 6 символів' } 
              })} 
              style={inputStyle} 
            />
            {errors.password && <p style={errorStyle}>{errors.password.message as string}</p>}
          </div>

          <button type="submit" style={submitButtonStyle}>Зареєструватися</button>
        </form>
      </div>
    </div>
  );
};

// --- СТИЛІ (можна потім винести в CSS) ---
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '400px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
};

const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' as 'border-box' };
const errorStyle = { color: 'red', fontSize: '12px', margin: '5px 0 0 0' };
const closeButtonStyle = { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' };
const submitButtonStyle = { width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '10px' };

export default RegisterModal;