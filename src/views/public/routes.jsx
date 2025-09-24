import { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LayoutPublic from "../../layouts/public";
import LoginPage from "./login";

function ViewPublic() {
  const Routes = () =>
    useRoutes([
      {
        path: `/`,
        element: <Navigate to={`/login`} replace />,
      },
      {
        path: `/login`,
        element: <LoginPage />,
      },
    ]);

  return (
    <Suspense>
      <LayoutPublic>
        <Routes />
      </LayoutPublic>
    </Suspense>
  );
}

export default ViewPublic;
