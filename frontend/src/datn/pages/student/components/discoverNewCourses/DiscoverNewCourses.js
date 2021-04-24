import React from "react";
import { Input, message, Row, Col } from "antd";
import CourseGrid from "./courseGrid/CourseGrid";

import courseApi from "../../../../api/CourseApi";
import { getAccessToken } from "../../../../api/TokenUtil";

import "./DiscoverNewCourses.css";

class DiscoverNewCourses extends React.Component {
  constructor(props) {
    super(props);
    this.formRefCreateNewCourse = React.createRef();
    this.state = {
      courseList: [],
      courseListResult: [],
    };
  }

  componentDidMount() {
    this.getCourseList();
  }

  getCourseList = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await courseApi.getCoursesStudentCanJoin(accessToken);
      console.log("res = ", response);
      this.setState({
        courseList: response,
        courseListResult: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách khóa học thất bại", 3);
    }
  };

  handleSearchCourse = async (value, event) => {
    this.setState({
      courseListResult: this.state.courseList.filter((course) => {
        return course.name.toUpperCase().includes(value.toUpperCase());
      }),
    });
  };

  render() {
    console.log("render manageCourse");
    console.log("state =", this.state);

    return (
      <div>
        <Row justify="start" style={{ marginTop: "10px" }}>
          <Col span={5} offset={5}>
            <Input.Search
              placeholder="Tìm kiếm khóa học"
              onSearch={this.handleSearchCourse}
              enterButton
            />
          </Col>
        </Row>
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <CourseGrid courseList={this.state.courseListResult} />
        </div>
      </div>
    );
  }
}

export default DiscoverNewCourses;
