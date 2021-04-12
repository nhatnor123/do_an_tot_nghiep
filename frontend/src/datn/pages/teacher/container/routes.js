import React from "react";

const Dashboard = React.lazy(() =>
  import("../../../../views/dashboard/Dashboard")
);

const ManageCourse = React.lazy(() =>
  import("../components/manageCourse/ManageCourse")
);

const ManageAccount = React.lazy(() =>
  import("../components/manageAccount/ManageAccount")
);

const ChangePassword = React.lazy(() =>
  import("../components/changePassword/ChangePassword")
);

const routes = [
  { path: "/teacher", exact: true, name: "Trang chủ" },
  {
    path: "/teacher/home",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/teacher/manageCourse",
    exact: true,
    name: "Quản lý khóa học của giáo viên",
    component: ManageCourse,
  },
  {
    path: "/teacher/manageAccount",
    exact: true,
    name: "Quản lý tài khoản cá nhân",
    component: ManageAccount,
  },
  {
    path: "/teacher/manageAccount/changePassword",
    exact: true,
    name: "Thay đổi mật khẩu",
    component: ChangePassword,
  },
];

export default routes;
