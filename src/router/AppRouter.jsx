import React, { useEffect } from 'react'
import { useAuthStore } from '../hooks/useAuthStore';
import { AuthRoutes } from './routes/AuthRoutes';
import { AppRoutes } from './routes/AppRoutes';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AppRouter = () => {

    const {status, checkAuthToken} = useAuthStore();
    //const authStatus = "not-authenticated";

    useEffect(() => {
        checkAuthToken();
      }, [])

    if (status === 'checking') {
        return (
          <h3>Cargando</h3>
        )
    }

  return (
    <Routes>
      { status === 'not-authenticated' ? (
        <Route path="/*" element={<AuthRoutes />} />
      ) : (
        <Route path="/*" element={<AppRoutes />} />
      )}

      <Route path="*" element={<Navigate to={status === 'not-authenticated' ? '/auth/login' : '/'} />} />

    </Routes>
  )
}
