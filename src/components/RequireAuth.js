import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth';

function RequireAuth({ children }) {
  let auth = useAuth();
  if (!auth?.user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default RequireAuth;
