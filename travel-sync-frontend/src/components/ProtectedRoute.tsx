import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  // Якщо токена немає - відправляємо на сторінку логіну
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Якщо токен є - показуємо контент (дітей)
  return <>{children}</>;
};

// ОБОВ'ЯЗКОВО додаємо цей рядок, щоб App.tsx міг його імпортувати
export default ProtectedRoute;