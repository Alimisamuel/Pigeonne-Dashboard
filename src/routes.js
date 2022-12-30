import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import ProtectedRoute from './sections/@dashboard/ProtectedRoute';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import RegisterPage from './pages/Register'
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import DashboardAppPage from './pages/DashboardAppPage';


// ----------------------------------------------------------------------

export default function Router() {

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <ProtectedRoute> <DashboardLayout /></ProtectedRoute> ,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element:  <DashboardAppPage /> },
       
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
