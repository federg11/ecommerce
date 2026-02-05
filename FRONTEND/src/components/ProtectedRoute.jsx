import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { userInfo } = useAuth();

  // 1. ¿Está logueado?
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // 2. ¿Requiere ser admin y no lo es?
  if (adminOnly && !userInfo.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, renderiza los componentes hijos (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;