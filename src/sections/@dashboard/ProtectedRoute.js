import React from 'react'
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({children}) => {
  const user = JSON.parse(window.localStorage.getItem('user'));

      if (user == null){
        return <Navigate to="/login" / >
    }
  return children;
};

export default ProtectedRoute