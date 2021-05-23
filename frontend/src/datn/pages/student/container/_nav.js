import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Trang chủ",
    to: "/student/home",
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Khám phá"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Khóa học mới",
    to: "/student/discoverNewCourses",
    icon: "cil-calculator",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Giáo viên",
    to: "/student/discoverTeachers",
    icon: "cil-star",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Quản lý"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Khóa học đang tham gia",
    to: "/student/manageCourse",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Tài khoản cá nhân",
    route: "/student/manageAccount",
    icon: "cil-user",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Xem thông tin tài khoản",
        to: "/student/manageAccount",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Đổi mật khẩu",
        to: "/student/manageAccount/changePassword",
      },
    ],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Chức năng khác"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Khiếu nại",
    to: "/student/manageComplaint",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

export default _nav;
