import React from "react";
import { message } from "antd";
import Parser from "html-react-parser";

import Comment from "../comment/Comment";

import lessonApi from "../../../../api/LessonApi";
import { getAccessToken } from "../../../../api/TokenUtil";
import "./LessonDetail.css";

message.config({
  top: 80,
});

class LessonDetail extends React.Component {
  constructor(props) {
    super(props);
    this.formRefUpdateLesson = React.createRef();
    this.state = {
      courseId: props.match.params.courseId,
      lessonId: props.match.params.lessonId,
    };
  }

  componentDidMount() {
    this.getLessonDetail();
  }

  getLessonDetail = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await lessonApi.getById(
        {
          lessonId: this.state.lessonId,
        },
        accessToken
      );
      console.log("response = ", response);
      this.setState({
        lessonDetail: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy thông tin chi tiết bài học thất bại", 3);
    }
  };

  render() {
    let lessonDetail = this.state.lessonDetail ? this.state.lessonDetail : null;

    return lessonDetail ? (
      <div>
        <div
          style={{
            width: "70%",
            marginLeft: "10%",
            marginTop: "20px",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: "600",
                marginBottom: "12px",
                marginTop: "10px",
                fontSize: "28px",
              }}
            >
              {lessonDetail.name}
            </div>
          </div>
          <div
            style={{
              marginTop: "15px",
              marginBottom: "30px",
              fontSize: "16px",
            }}
          >
            {lessonDetail.description}
          </div>
          {Parser(lessonDetail.content)}
          <Comment
            courseId={this.state.courseId}
            lessonId={this.state.lessonId}
          />
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}

export default LessonDetail;
