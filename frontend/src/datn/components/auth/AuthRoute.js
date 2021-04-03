import React from "react";
import AuthBeforeRender from "./AuthBeforeRender";
import { Route } from "react-router-dom";

export const AuthRoute = ({ component: Component, exact, path, role }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        props = { ...props, role };

        return (
          <AuthBeforeRender
            history={props.history}
            render={() => <Component {...props} />}
            role={role}
          />
        );
      }}
    />
  );
};
