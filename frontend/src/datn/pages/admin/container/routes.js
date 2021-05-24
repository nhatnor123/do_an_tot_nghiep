import React from "react";

const Dashboard = React.lazy(() =>
  import("../../../../views/dashboard/Dashboard")
);

const ManageUserAccount = React.lazy(() =>
  import("../components/manageUserAccount/ManageUserAccount")
);

const ManageAccount = React.lazy(() =>
  import("../components/manageAccount/ManageAccount")
);

const ChangePassword = React.lazy(() =>
  import("../components/changePassword/ChangePassword")
);

const ManageComplaint = React.lazy(() =>
  import("../components/manageComplaint/ManageComplaint")
);

const routes = [
  { path: "/admin", exact: true, name: "Trang chủ" },
  { path: "/admin/home", exact: true, name: "Dashboard", component: Dashboard },
  {
    path: "/admin/manageUserAccount",
    exact: true,
    name: "Quản lý tài khoản người dùng",
    component: ManageUserAccount,
  },
  {
    path: "/admin/manageAccount",
    exact: true,
    name: "Quản lý tài khoản cá nhân",
    component: ManageAccount,
  },
  {
    path: "/admin/manageAccount/changePassword",
    exact: true,
    name: "Thay đổi mật khẩu",
    component: ChangePassword,
  },
  {
    path: "/admin/manageComplaint",
    exact: true,
    name: "Quản lý khiếu nại",
    component: ManageComplaint,
  },
];

export default routes;
