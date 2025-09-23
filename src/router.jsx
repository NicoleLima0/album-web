import React, { Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import { appRoot, tokenStorageKey } from './constants/defaultValues';
import AuthProvider from './helpers/authProvider';

const ViewApp = React.lazy(() => import('./views/app/routes'));
const ViewPublic = React.lazy(() => import('./views/public/routes'));

export default function Routers() {
    
  function RequireAuth({ children }) {
    const location = useLocation();
    let token = atob(localStorage.getItem(tokenStorageKey));

    if (!token) {
      return <Navigate to={`/login`} state={{ from: location }} replace />;
    }
    return children;
  }

  const Routes = () =>
    useRoutes([
      {
        path: `${appRoot}/*`,
        element: (
          <Suspense>
            <RequireAuth>
              <ViewApp />
            </RequireAuth>
          </Suspense>
        ),
      },
      {
        path: `/*`,
        element: (
          <Suspense>
            <ViewPublic />
          </Suspense>
        ),
      },
    ]);

  return (
    <Suspense>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Suspense>
  );
}