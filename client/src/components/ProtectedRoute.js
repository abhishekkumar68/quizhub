import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Check if token exists in localStorage
    const isAuthenticated = !!localStorage.getItem('token');

    // If authenticated, render the child routes, otherwise redirect to login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
