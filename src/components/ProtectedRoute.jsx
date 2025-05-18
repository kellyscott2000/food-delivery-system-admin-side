import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('authToken');
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  const currentTime = new Date().getTime();

  if (!token || currentTime > tokenExpiration) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;