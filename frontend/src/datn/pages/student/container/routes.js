import React from "react";

const Dashboard = React.lazy(() =>
  import("../../../../views/dashboard/Dashboard")
);

const DiscoverNewCourses = React.lazy(() =>
  import("../components/discoverNewCourses/DiscoverNewCourses")
);

const CourseOverview = React.lazy(() =>
  import("../components/discoverNewCourses/courseOverview/CourseOverview")
);

const DiscoverTeacher = React.lazy(() =>
  import("../components/discoverTeacher/DiscoverTeacher")
);

const ManageCourse = React.lazy(() =>
  import("../components/manageCourse/ManageCourse")
);

const ManageComplaint = React.lazy(() =>
  import("../components/manageComplaint/ManageComplaint")
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
  { path: "/student", exact: true, name: "Trang chủ" },
  {
    path: "/student/home",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/student/discoverNewCourses",
    exact: true,
    name: "Khóa học mới",
    component: DiscoverNewCourses,
  },
  {
    path: "/student/discoverNewCourses/course/:courseId",
    exact: true,
    name: "Chi tiết khóa học",
    component: CourseOverview,
  },
  {
    path: "/student/discoverTeachers",
    exact: true,
    name: "Khám phá giáo viên",
    component: DiscoverTeacher,
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
    path: "/student/manageCourse/course/:courseId/test/:testId",
    exact: true,
    name: "Chi tiết bài kiểm tra",
    component: TestDetail,
  },
  {
    path: "/student/manageAccount",
    exact: true,
    name: "Quản lý tài khoản cá nhân",
    component: ManageAccount,
  },
  {
    path: "/student/manageComplaint",
    exact: true,
    name: "Quản lý khiếu nại",
    component: ManageComplaint,
  },
  {
    path: "/student/manageAccount/changePassword",
    exact: true,
    name: "Thay đổi mật khẩu",
    component: ChangePassword,
  },
];

export default routes;
