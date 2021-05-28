import React from "react";
import { Tabs } from "antd";

import CourseOverview from "../courseOverview/CourseOverview";
import ManageLesson from "../manageLesson/ManageLesson";
import ManageTest from "../manageTest/ManageTest";
import ManageCourseFile from "../manageCourseFile/ManageCourseFile";

const { TabPane } = Tabs;

class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCourseId: props.match.params.courseId,
    };
  }

  render() {
    const courseId = this.state.currentCourseId;

    return (
      <div>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="Tổng quan khóa học" key="1">
            <CourseOverview courseId={courseId} history={this.props.history} />
          </TabPane>
          <TabPane tab="Bài học" key="2">
            <ManageLesson courseId={courseId} />
          </TabPane>
          <TabPane tab="Bài kiểm tra" key="3">
            <ManageTest courseId={courseId} />
          </TabPane>
          <TabPane tab="Tài liệu học tập" key="4">
            <ManageCourseFile courseId={courseId} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default CourseDetail;
