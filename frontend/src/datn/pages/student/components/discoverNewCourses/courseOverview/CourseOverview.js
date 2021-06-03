import React from "react";
import {
  message,
  Tag,
  Modal,
  Button,
  Row,
  Col,
  Popconfirm,
  Form,
  Input,
} from "antd";
import {
  LogoutOutlined,
  LoginOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import courseApi from "../../../../../api/CourseApi";
import studentCourseApi from "../../../../../api/StudentCourseApi";
import { getAccessToken } from "../../../../../api/TokenUtil";

const inputStyle = {
  fontSize: "16px",
};

const labelStyle = {
  fontSize: "14px",
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 18,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

message.config({
  top: 80,
});

class CourseOverview extends React.Component {
  constructor(props) {
    super(props);
    this.formRefJoinCourse = React.createRef();
    this.state = {
      courseId: props.match.params.courseId,
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
      const response_2 = await studentCourseApi.checkIfJoiningCourse(
        {
          courseId: this.state.courseId,
        },
        accessToken
      );
      console.log("res 2 = ", response_2);

      console.log("ahihi");
      if (response_2.isApproved === true) {
        this.props.history.push(
          `/student/manageCourse/course/${this.state.courseId}`
        );
      } else if (response_2.isApproved === false) {
        this.setState({
          courseDetail: response,
          courseCode: response.code,
          isRequestingToJoin: true,
        });
      } else {
        this.setState({
          courseDetail: response,
          courseCode: response.code,
          isRequestingToJoin: false,
        });
      }
    } catch (e) {
      console.error(e);
      message.error("Lấy thông tin chi tiết khóa học thất bại", 3);
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

  handleResetFormJoinCourse = () => {
    this.formRefJoinCourse.current.resetFields();
  };

  handleClickCancelRequestJoinCourseButton = async () => {
    var accessToken = getAccessToken();

    try {
      const response = await studentCourseApi.cancelRequestToJoinCourse(
        {
          courseId: this.state.courseId,
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Hủy yêu cầu tham gia khóa học thành công", 3);
      this.getCourseDetail();
    } catch (e) {
      console.error(e);
      message.error("Hủy yêu cầu tham gia thất bại", 3);
    }
  };

  handleRequestJoinCourse = async () => {
    var accessToken = getAccessToken();

    try {
      const response = await studentCourseApi.requestToJoinCourse(
        {
          courseId: this.state.courseId,
          code: null,
        },
        accessToken
      );
      console.log("resp = ", response);
      message.success("Yêu cầu tham gia khóa học thành công", 3);
      if (response.isApproved) {
        this.props.history.push(
          `/student/manageCourse/course/${this.state.courseId}`
        );
      } else {
        this.getCourseDetail();
      }
      this.setState({
        isModalCourseCodeVisible: false,
      });
    } catch (e) {
      console.error(e);
      message.error("Yêu cầu tham gia khóa học thất bại", 3);
    }
  };

  handleSummitJoinCourseByCode = async (value) => {
    var accessToken = getAccessToken();

    try {
      const response = await studentCourseApi.requestToJoinCourse(
        {
          courseId: this.state.courseId,
          code: value.code ? value.code : "",
        },
        accessToken
      );
      console.log("resp = ", response);
      message.success("Tham gia khóa học thành công", 3);
      if (response.isApproved) {
        this.props.history.push(
          `/student/manageCourse/course/${this.state.courseId}`
        );
      } else {
        this.getCourseDetail();
      }
      this.setState({
        isModalCourseCodeVisible: false,
      });
    } catch (e) {
      console.error(e);
      message.error("Mã code không chính xác", 3);
    }
  };

  render() {
    console.log("state =", this.state);
    let courseDetail = this.state.courseDetail ? this.state.courseDetail : null;

    return courseDetail ? (
      <div>
        <Row justify="end" style={{ marginTop: "10px" }}>
          {this.state.isRequestingToJoin ? (
            <Col span={5}>
              <Popconfirm
                title="Xác nhận hủy yêu cầu tham gia khóa học này ?"
                cancelText="Hủy"
                okText="Đồng ý"
                onConfirm={this.handleClickCancelRequestJoinCourseButton}
              >
                <Button type="primary" style={{ margin: "1% 0px 1% 20px" }}>
                  <LogoutOutlined /> Hủy yêu cầu tham gia khóa học
                </Button>
              </Popconfirm>
            </Col>
          ) : (
            <>
              <Col span={4}>
                <Button
                  type="primary"
                  onClick={this.handleRequestJoinCourse}
                  style={{ margin: "1% 20px 1% 20px" }}
                >
                  <PlusCircleFilled /> Yêu cầu tham gia
                </Button>
              </Col>
              <Col span={4}>
                <Button
                  type="primary"
                  onClick={this.showModalCourseCode}
                  style={{ margin: "1% 20px 1% 20px" }}
                >
                  <LoginOutlined /> Tham gia bằng mã code
                </Button>
              </Col>
            </>
          )}
        </Row>
        <Modal
          title="Tham gia khóa học bằng mã Code"
          width={650}
          okButtonProps={{ disabled: true }}
          cancelText={"Thoát"}
          onCancel={this.onCloseModalCourseCode}
          visible={this.state.isModalCourseCodeVisible}
          placement="right"
        >
          <Form
            layout="vertical"
            hideRequiredMark
            scrollToFirstError
            onFinish={this.handleSummitJoinCourseByCode}
            ref={this.formRefJoinCourse}
          >
            <Form.Item {...tailFormItemLayout}>
              <Form.Item
                name="code"
                label={<div style={labelStyle}>Mã Code</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã code !",
                    whitespace: true,
                  },
                ]}
              >
                <Input style={inputStyle} />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: "10px 10px 10px 10%" }}
              >
                Đồng ý
              </Button>
              <Button
                type="primary"
                style={{ margin: "10px 10px 0px 30%" }}
                onClick={this.handleResetFormJoinCourse}
                htmlType="button"
              >
                Đặt lại
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Row style={{ marginTop: "30px" }}>
          <Col span={16} offset={4}>
            <img
              src={courseDetail.imageUrl}
              alt={courseDetail.name}
              style={{ width: "65%", height: "auto", margin: "auto" }}
            />
            <div style={{ marginLeft: "15px" }}>
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "12px",
                  marginTop: "17px",
                  color: "#076ac8 !important",
                  fontSize: "28px",
                }}
              >
                {courseDetail.name}
              </div>
              <div
                style={{
                  marginTop: "15px",
                  marginBottom: "30px",
                  fontSize: "18px",
                }}
              >
                {courseDetail.isPublic === true ? (
                  <Tag color="#55acee" style={{ fontSize: "15px" }}>
                    Công khai
                  </Tag>
                ) : (
                  <Tag color="#00a76a" style={{ fontSize: "15px" }}>
                    Không Công khai
                  </Tag>
                )}
              </div>
              <div
                style={{
                  color: "#969696",
                  fontSize: "17px",
                  marginBottom: "150px",
                }}
              >
                {courseDetail.description}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default CourseOverview;
