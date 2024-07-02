import React, { useMemo } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children, redirect }) => {
    //create a custom hook to check if the user is authenticated
    const authenticate = useMemo(() => !!localStorage.getItem('token'), []);
    const location = useLocation();

    //if the user is authenticated, render the children
    return authenticate ? (
        children
    ) : (
        <Navigate
            to={`/auth/sign-in?redirect=${encodeURIComponent(redirect || location.pathname)}`}
        />
    );
};

export default ProtectedRoute;