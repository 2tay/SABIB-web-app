import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PublicRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      {auth?.logged ? <Navigate to='/' /> : <Outlet />}
    </div>
  );
};

export default PublicRoutes;
