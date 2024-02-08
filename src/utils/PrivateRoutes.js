import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = () => {
  const { auth, loading, logout } = useAuth();

  if (loading) {
    return <div>loading...</div>;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container mt-3">
      {auth?.logged ? (
        <div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Link to="/" className="btn btn-primary mx-2">
              Home
            </Link>
            <Link to="/devices" className="btn btn-success mx-2">
              Devices
            </Link>
          </div>
          <p className="fs-5 text-info">SABIB</p>
          <div>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
          
        </div>
        <div>
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRoutes;
