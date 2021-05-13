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

const TestDetail = React.lazy(() =>
  import("../components/testDetail/TestDetail")
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
    path: "/teacher/manageCourse/course/:courseId",
    exact: true,
    name: "Chi tiết khóa học",
    component: CourseDetail,
  },
  {
    path: "/teacher/manageCourse/course/:courseId/lesson/:lessonId",
    exact: true,
    name: "Chi tiết bài học",
    component: LessonDetail,
  },
  {
    path: "/teacher/manageCourse/course/:courseId/test/:testId",
    exact: true,
    name: "Chi tiết bài kiểm tra",
    component: TestDetail,
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
