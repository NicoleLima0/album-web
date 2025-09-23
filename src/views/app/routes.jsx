import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { appRoot } from '../../constants/defaultValues';
import LayoutApp from '../../layouts/app';

const HomeComponent = React.lazy(() => import('./home'));

const ViewApp = () => {
  const path = `${appRoot}`;

  const Routes = () =>
    useRoutes([
      {
        path: `/`,
        element: <Navigate to={`${path}/home`} replace />,
      },
      { path: `home`, element: <HomeComponent /> },
    ]);

  return (
    <LayoutApp>
      <Routes />
    </LayoutApp>
  );
};

export default ViewApp;