import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import ProtectedRoute from './utils/ProtectedRoute'
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import RegisterPage from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import DashboardAppPage from './pages/DashboardAppPage';
// import { useAuthContext } from './hooks/useAuthContext';
// import Apartment from './pages/Apartment';
import UserPage from './pages/UserPage';

// ----------------------------------------------------------------------

export default function Router() {
// const {user } = useAuthContext()
  const routes = useRoutes([
    {
 
      path: '/dashboard',
      element:  <ProtectedRoute><DashboardLayout /></ProtectedRoute> ,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <ProtectedRoute> <DashboardAppPage /> </ProtectedRoute> },
       {path:'properties', element:<UserPage/>}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: 'forgetPassword',
      element: <ForgetPassword />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);


  return routes;

}
