import { Navigate } from 'react-router-dom'
// import { useAuthContext } from '../hooks/useAuthContext';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  console.log(user)


  if (user === null) {
 
    return <Navigate to="/login" / >
 
  }


  return children;
};

export default ProtectedRoute;
