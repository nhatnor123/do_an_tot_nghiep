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

const CourseDetail = React.lazy(() =>
  import("../components/courseDetail/CourseDetail")
);

const LessonDetail = React.lazy(() =>
  import("../components/lessonDetail/LessonDetail")
);

const ChangePassword = React.lazy(() =>
  import("../components/changePassword/ChangePassword")
);

const routes = [
  { path: "/student", exact: true, name: "Trang chủ" },
  {
    path: "/student/home",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/student/manageCourse",
    exact: true,
    name: "Quản lý khóa học của học viên",
    component: ManageCourse,
  },
  {
    path: "/student/manageCourse/course/:courseId",
    exact: true,
    name: "Chi tiết khóa học",
    component: CourseDetail,
  },
  {
    path: "/student/manageCourse/course/:courseId/lesson/:lessonId",
    exact: true,
    name: "Chi tiết bài học",
    component: LessonDetail,
  },
  {
    path: "/student/manageAccount",
    exact: true,
    name: "Quản lý tài khoản cá nhân",
    component: ManageAccount,
  },
  {
    path: "/student/manageAccount/changePassword",
    exact: true,
    name: "Thay đổi mật khẩu",
    component: ChangePassword,
  },
];

export default routes;
