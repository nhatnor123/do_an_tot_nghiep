import React from "react";

const Dashboard = React.lazy(() =>
  import("../../../../views/dashboard/Dashboard")
);

const ManageUserAccount = React.lazy(() =>
  import("../components/manageUserAccount/ManageUserAccount")
);

const routes = [
  { path: "/admin", exact: true, name: "Home" },
  { path: "/admin/home", exact: true, name: "Dashboard", component: Dashboard },
  {
    path: "/admin/manageUserAccount",
    exact: true,
    name: "ManageUserAccount",
    component: ManageUserAccount,
  },
];

export default routes;
