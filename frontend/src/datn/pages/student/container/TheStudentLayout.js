import { BackTop } from "antd";
import React from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheAdminLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
          <BackTop />
        </div>
        {/* <TheFooter /> */}
      </div>
    </div>
  );
};

export default TheAdminLayout;
