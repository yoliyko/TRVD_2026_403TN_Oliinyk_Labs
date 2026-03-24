import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TripsPage from './pages/TripsPage';
import SharedTripPage from './pages/SharedTripPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      {/* НІЧОГО не має бути тут, крім Routes (ToastContainer ми вже перенесли в main.tsx) */}
      <Routes>
        {/* Головна - редирект */}
        <Route path="/" element={<Navigate to="/trips" />} />

        {/* Сторінка входу - показується ТІЛЬКИ на /login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Публічна сторінка шерингу */}
        <Route path="/share/:shareId" element={<SharedTripPage />} />
        
        {/* Захищений кабінет - показується ТІЛЬКИ на /trips */}
        <Route path="/trips" element={
          <ProtectedRoute>
            <TripsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;