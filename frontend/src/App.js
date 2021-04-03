import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthRoute } from "./datn/components/auth/AuthRoute";
import "./scss/style.scss";

import TheAdminLayout from "./datn/pages/admin/container/TheAdminLayout";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
// const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// const TheAdminLayout = React.lazy(() => {
//   import("./datn/pages/admin/container/TheAdminLayout");
// });

// Pages
const Login = React.lazy(() => import("./datn/pages/login/Login"));
const Register = React.lazy(() => import("./datn/pages/register/Register"));
const Page404 = React.lazy(() => import("./datn/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./datn/pages/page500/Page500"));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <AuthRoute
              path="/admin"
              component={TheAdminLayout}
              role={"ADMIN"}
            />
            <Route
              exact
              path="*"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
