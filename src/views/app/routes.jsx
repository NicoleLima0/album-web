import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { appRoot } from "../../constants/defaultValues";
import LayoutApp from "../../layouts/app";

const HomeComponent = React.lazy(() => import("./home"));
const AlbumDetailComponent = React.lazy(() => import("./details-album"));

const ViewApp = () => {
  const path = `${appRoot}`;

  const Routes = () =>
    useRoutes([
      {
        path: `/`,
        element: <Navigate to={`${path}/home`} replace />,
      },
      { path: `home`, element: <HomeComponent /> },
      {
        path: `album/:albumId`,
        element: <AlbumDetailComponent />,
      },
    ]);

  return (
    <LayoutApp>
      <Routes />
    </LayoutApp>
  );
};

export default ViewApp;