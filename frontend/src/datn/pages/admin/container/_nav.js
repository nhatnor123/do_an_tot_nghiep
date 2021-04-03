import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Trang chủ",
    to: "/admin/home",
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Quản lý"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Tài khoản người dùng",
    to: "/admin/manageUserAccount",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Tài khoản cá nhân",
    to: "/admin/manageAccount",
    icon: "cil-user",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Thống kê"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Thống kê",
    to: "/admin/viewStats",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

export default _nav;
