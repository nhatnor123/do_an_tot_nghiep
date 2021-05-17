import React from "react";
import { Tabs } from "antd";

import Detail from "./detail/Detail";
import ManageStudentTest from "./manageStudentTest/ManageStudentTest";

const { TabPane } = Tabs;

class CourseDetail extends React.Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="Chi tiết bài kiểm tra" key="1">
            <Detail
              courseId={this.props.match.params.courseId}
              testId={this.props.match.params.testId}
            />
          </TabPane>
          <TabPane tab="Bài làm của học viên" key="2">
            <ManageStudentTest
              courseId={this.props.match.params.courseId}
              testId={this.props.match.params.testId}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default CourseDetail;
