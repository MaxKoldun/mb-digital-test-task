import { Navigate, Outlet } from 'react-router-dom';
import { userSelectors } from '../../store';
import { useSelector } from 'react-redux';

export const ProtectedRoute = () => {
  const user = useSelector(userSelectors.user);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
