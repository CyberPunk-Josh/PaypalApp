// src/routes/AuthRoutes.js
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AUTH_PATHS } from '../paths';
import { LoginPage } from '../../pages/LoginPage';
import { Register } from '../../pages/Register';
// Add other auth pages here

export const AuthRoutes = () => (
  <Suspense fallback={<div>Loading auth...</div>}>
    <Routes>
      <Route path={AUTH_PATHS.LOGIN} element={<LoginPage />} />
      <Route path={AUTH_PATHS.REGISTER} element={<Register />} />
      {/* Add other auth routes here */}
      <Route path="*" element={<Navigate to={AUTH_PATHS.LOGIN} />} />
    </Routes>
  </Suspense>
);