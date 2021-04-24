import React from "react";
import { Input, message, Row, Col } from "antd";
import TeacherGrid from "./teacherGrid/TeacherGrid";

import teacherApi from "../../../../api/TeacherApi";
import { getAccessToken } from "../../../../api/TokenUtil";

import "./DiscoverTeacher.css";

class DiscoverTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherList: [],
      teacherListResult: [],
    };
  }

  componentDidMount() {
    this.getTeacherList();
  }

  getTeacherList = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await teacherApi.discoverTeachers(accessToken);
      console.log("res = ", response);
      this.setState({
        teacherList: response,
        teacherListResult: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách giáo viên thất bại", 3);
    }
  };

  handleSearchTeacher = async (value, event) => {
    this.setState({
      teacherListResult: this.state.teacherList.filter((teacher) => {
        console.log("teacher =", teacher);
        return teacher.teacher.displayName
          .toUpperCase()
          .includes(value.toUpperCase());
      }),
    });
  };

  render() {
    console.log("state =", this.state);

    return (
      <div>
        <Row justify="start" style={{ marginTop: "10px" }}>
          <Col span={5} offset={5}>
            <Input.Search
              placeholder="Tìm kiếm giáo viên"
              onSearch={this.handleSearchTeacher}
              enterButton
            />
          </Col>
        </Row>
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <TeacherGrid teacherList={this.state.teacherListResult} />
        </div>
      </div>
    );
  }
}

export default DiscoverTeacher;
