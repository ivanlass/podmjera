import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth0();

  if (user && !user['http://demozero.net/roles'].includes('storeOwner')) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
