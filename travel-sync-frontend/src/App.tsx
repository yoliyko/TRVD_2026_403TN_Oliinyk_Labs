import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TripsPage from './pages/TripsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Головна сторінка перенаправляє на /trips */}
        <Route path="/" element={<Navigate to="/trips" />} />

        {/* Публічна сторінка для входу */}
        <Route path="/login" element={<LoginPage />} />

        {/* Захищена сторінка (ми додамо захист трохи згодом) */}
        <Route path="/trips" element={
          <ProtectedRoute>
            <TripsPage />
          </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;