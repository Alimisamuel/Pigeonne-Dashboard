import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate()

  if (user == null) {
 
       navigate("/login")
 
  }


  return children;
};

export default ProtectedRoute;
