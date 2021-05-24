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
          <TabPane tab="Khiếu nại của tôi" key="1">
            <ManageMyComplaint />
          </TabPane>
          <TabPane tab="Trả lời khiếu nại" key="2">
            <ManageCourseComplaint />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default CourseDetail;
