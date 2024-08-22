import React from 'react'
import { Navigate } from 'react-router-dom';
import { AUTH_PATHS } from './paths';
import { useAuthStore } from '../hooks/useAuthStore';

export const ProtectedRoute = ({ children }) => {
    const { status } = useAuthStore();

    if (status === "not-authenticated") {
        return <Navigate to={AUTH_PATHS.LOGIN} />;
    }

    return children;

}
