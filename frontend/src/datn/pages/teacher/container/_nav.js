import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Trang chủ",
    to: "/teacher/home",
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Quản lý"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Khóa học",
    to: "/teacher/manageCourse",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Tài khoản cá nhân",
    route: "/teacher/manageAccount",
    icon: "cil-user",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Xem thông tin tài khoản",
        to: "/teacher/manageAccount",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Đổi mật khẩu",
        to: "/teacher/manageAccount/changePassword",
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
    to: "/teacher/complaint",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

export default _nav;
