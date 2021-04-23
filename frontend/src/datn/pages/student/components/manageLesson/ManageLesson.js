import React from "react";
import { Input, message, Row, Col } from "antd";

import LessonGrid from "../lessonGrid/LessonGrid";

import LessonApi from "../../../../api/LessonApi";
import { getAccessToken } from "../../../../api/TokenUtil";

class ManageLesson extends React.Component {
  constructor(props) {
    super(props);
    this.formRefCreateNewLesson = React.createRef();
    this.state = {
      lessonList: [],
    };
  }

  componentDidMount() {
    this.getLessonList();
  }

  getLessonList = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await LessonApi.search(
        {
          lessonId: 0,
          courseId: this.props.courseId,
          name: "",
          description: "",
          content: "",
          isActive: false,
          createdAtFrom: "",
          createdAtTo: "",
          updatedAtFrom: "",
          updatedAtTo: "",
          fieldList: ["courseId"],
        },
        accessToken
      );
      console.log("res = ", response);
      this.setState({
        lessonList: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách bài học thất bại", 3);
    }
  };

  handleSearchLesson = async (value, event) => {
    var accessToken = getAccessToken();
    try {
      const response = await LessonApi.search(
        {
          lessonId: 0,
          courseId: this.props.courseId,
          name: value,
          description: "",
          content: "",
          isActive: false,
          createdAtFrom: "",
          createdAtTo: "",
          updatedAtFrom: "",
          updatedAtTo: "",
          fieldList: ["courseId", "name"],
        },
        accessToken
      );
      console.log("res = ", response);
      this.setState({
        lessonList: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách bài học của giáo viên thất bại", 3);
    }
  };

  render() {
    console.log("render manageLesson");
    console.log("state =", this.state);

    return (
      <div>
        <Row justify="start" style={{ marginTop: "10px" }}>
          <Col span={5} offset={5}>
            <Input.Search
              placeholder="Tìm kiếm bài học"
              onSearch={this.handleSearchLesson}
              enterButton
            />
          </Col>
        </Row>

        <div>
          <LessonGrid
            courseId={this.props.courseId}
            lessonList={this.state.lessonList}
          />
        </div>
      </div>
    );
  }
}

export default ManageLesson;
