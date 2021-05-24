import React from "react";
import { Tabs } from "antd";

import ManageMyComplaint from "./manageMyComplaint/ManageMyComplaint";
import ManageCourseComplaint from "./manageCourseComplaint/ManageCourseComplaint";

const { TabPane } = Tabs;

class CourseDetail extends React.Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="Trả lời khiếu nại" key="1">
            <ManageCourseComplaint />
          </TabPane>
          <TabPane tab="Xem khiếu nại giáo viên" key="2">
            <ManageMyComplaint />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default CourseDetail;
