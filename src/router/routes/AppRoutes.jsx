// src/routes/AppRoutes.js
import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { APP_PATHS } from '../paths';
import { ProtectedRoute } from '../ProtectedRoute';
import {StoreApp} from '../../StoreApp/pages/StoreApp'

export const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path={APP_PATHS.STOREAPP} element={<ProtectedRoute><StoreApp /></ProtectedRoute>} />
      {/* Add other app routes here */}
      <Route path="*" element={<Navigate to={APP_PATHS.STOREAPP} />} />
    </Routes>
  </Suspense>
);