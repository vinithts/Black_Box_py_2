import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoutes = ({
  component: Component,
  isAuthenticated,
  ...others
}) => {
  return (
    <Route
      {...others}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoutes;
