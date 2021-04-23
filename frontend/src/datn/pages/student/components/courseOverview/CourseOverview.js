import React from "react";
import { message, Tag, Modal, Button, Row, Col, Popconfirm } from "antd";
import { LogoutOutlined, KeyOutlined } from "@ant-design/icons";
import courseApi from "../../../../api/CourseApi";
import studentCourseApi from "../../../../api/StudentCourseApi";
import { getAccessToken } from "../../../../api/TokenUtil";

message.config({
  top: 80,
});

class CourseOverview extends React.Component {
  constructor(props) {
    super(props);
    this.formRefUpdateCourse = React.createRef();
    this.state = {
      courseId: props.courseId,
      isModalCourseCodeVisible: false,
    };
  }

  componentDidMount() {
    console.log("State = ", this.state);
    this.getCourseDetail();
  }

  getCourseDetail = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await courseApi.getById(
        {
          courseId: this.state.courseId,
        },
        accessToken
      );
      console.log("res = ", response);
      this.setState({
        courseDetail: response,
        courseCode: response.code,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy thông tin chi tiết khóa học của học viên thất bại", 3);
    }
  };

  showModalCourseCode = () => {
    this.setState({
      isModalCourseCodeVisible: true,
    });
  };

  onCloseModalCourseCode = () => {
    this.setState({
      isModalCourseCodeVisible: false,
    });
  };

  handleClickLeaveCourseButton = async () => {
    var accessToken = getAccessToken();

    try {
      const response = await studentCourseApi.leaveCourse(
        {
          courseId: this.state.courseId,
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Rời khỏi khóa học thành công", 3);
      this.props.history.push("/student/manageCourse");
    } catch (e) {
      console.error(e);
      message.error("Rời khỏi khóa học thất bại", 3);
    }
  };

  render() {
    let courseDetail = this.state.courseDetail ? this.state.courseDetail : null;

    return courseDetail ? (
      <div>
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Col span={3}>
            <Button
              type="primary"
              onClick={this.showModalCourseCode}
              style={{ margin: "1% 0px 1% 1%" }}
            >
              <KeyOutlined /> Code khóa học
            </Button>
          </Col>
          <Col span={5}>
            <Popconfirm
              title="Xác nhận rời khóa học này ?"
              cancelText="Hủy"
              okText="Đồng ý"
              onConfirm={this.handleClickLeaveCourseButton}
            >
              <Button type="primary" style={{ margin: "1% 0px 1% 20px" }}>
                <LogoutOutlined /> Rời khỏi khóa học
              </Button>
            </Popconfirm>
          </Col>
        </Row>
        <Modal
          title="Mã Code khóa học"
          width={650}
          okButtonProps={{ disabled: true }}
          cancelText={"Thoát"}
          onCancel={this.onCloseModalCourseCode}
          visible={this.state.isModalCourseCodeVisible}
          placement="right"
        >
          <div
            style={{
              fontSize: "20px",
              marginBottom: "20px",
            }}
          >
            {this.state.courseCode}
          </div>
        </Modal>

        <img
          src={courseDetail.imageUrl}
          alt={courseDetail.name}
          style={{ width: "50%", height: "auto" }}
        />
        <div style={{ marginLeft: "15px" }}>
          <div
            style={{
              fontWeight: "600",
              marginBottom: "12px",
              marginTop: "10px",
              color: "#076ac8 !important",
              fontSize: "22px",
            }}
          >
            {courseDetail.name}
          </div>
          <div style={{ color: "#969696" }}>{courseDetail.description}</div>
          <div style={{ marginTop: "15px", marginBottom: "30px" }}>
            {courseDetail.isPublic === true ? (
              <Tag color="#55acee">Công khai</Tag>
            ) : (
              <Tag color="#00a76a">Không Công khai</Tag>
            )}
          </div>
        </div>
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default CourseOverview;
