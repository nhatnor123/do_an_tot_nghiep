import React from "react";
import { message, Form, Modal, Button, Row, Col, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import lessonApi from "../../../../api/LessonApi";
import { getAccessToken } from "../../../../api/TokenUtil";

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

class LessonDetail extends React.Component {
  constructor(props) {
    super(props);
    this.formRefUpdateLesson = React.createRef();
    this.state = {
      courseId: props.match.params.courseId,
      lessonId: props.match.params.lessonId,
      isModalUpdateLessonVisible: false,
    };
  }

  componentDidMount() {
    console.log("State = ", this.state);
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

  showModalUpdateLesson = () => {
    this.setState({
      isModalUpdateLessonVisible: true,
    });
  };

  onCloseModalUpdateLesson = () => {
    this.setState({
      isModalUpdateLessonVisible: false,
    });
  };

  handleResetFormUpdateLesson = () => {
    this.formRefUpdateLesson.current.resetFields();
  };

  handleSummitUpdateLesson = async (value) => {
    var accessToken = getAccessToken();

    try {
      const response = await lessonApi.update(
        {
          lessonId: this.state.lessonId,
          name: value.name,
          description: value.description,
          content: value.content,
          fieldList: ["name", "description", "content"],
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Cập nhật thông tin bài học thành công", 3);
      this.onCloseModalUpdateLesson();
      this.getLessonDetail();
      this.handleResetFormUpdateLesson();
    } catch (e) {
      console.error(e);
      message.error("Cập nhật thông tin bài học thất bại", 3);
    }
  };

  handleClickDeleteButton = async () => {
    var accessToken = getAccessToken();

    try {
      const response = await lessonApi.archive(
        {
          lessonId: this.state.lessonId,
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Xóa bài học thành công", 3);
      this.props.history.push(
        `/teacher/manageCourse/course/${this.state.courseId}`
      );
    } catch (e) {
      console.error(e);
      message.error("Xóa bài học thất bại", 3);
    }
  };

  render() {
    let lessonDetail = this.state.lessonDetail ? this.state.lessonDetail : null;

    return lessonDetail ? (
      <div>
        <Row>
          <Col span={5}>
            <Button
              type="primary"
              onClick={this.showModalUpdateLesson}
              style={{ margin: "1% 0px 1% 1%" }}
            >
              <PlusOutlined /> Sửa
            </Button>
            <Button
              type="primary"
              onClick={this.handleClickDeleteButton}
              style={{ margin: "1% 0px 1% 1%" }}
            >
              <PlusOutlined /> Xóa
            </Button>
          </Col>
        </Row>
        <Modal></Modal>
        <Modal
          title="Sửa bài học"
          width={650}
          okButtonProps={{ disabled: true }}
          cancelText={"Thoát"}
          onCancel={this.onCloseModalUpdateLesson}
          visible={this.state.isModalUpdateLessonVisible}
          placement="right"
        >
          <Form
            layout="vertical"
            hideRequiredMark
            scrollToFirstError
            onFinish={this.handleSummitUpdateLesson}
            ref={this.formRefUpdateLesson}
          >
            <Form.Item {...tailFormItemLayout}>
              <Form.Item
                name="name"
                label={<div style={labelStyle}>Tên</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền tên bài học !",
                  },
                ]}
              >
                <Input style={inputStyle} />
              </Form.Item>

              <Form.Item
                name="description"
                label={<div style={labelStyle}>Mô tả</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền mô tả của bài học !",
                  },
                ]}
              >
                <Input.TextArea
                  style={inputStyle}
                  autoSize={{ minRows: 5, maxRows: 6 }}
                />
              </Form.Item>

              <Form.Item
                name="content"
                label={<div style={labelStyle}>Nội dung</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền nội dung của bài học !",
                  },
                ]}
              >
                <Input.TextArea
                  style={inputStyle}
                  autoSize={{ minRows: 5, maxRows: 6 }}
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: "10px 10px 10px 10%" }}
              >
                Cập nhật
              </Button>
              <Button
                type="primary"
                style={{ margin: "10px 10px 0px 30%" }}
                onClick={this.handleResetFormUpdateCourse}
                htmlType="button"
              >
                Đặt lại
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <div style={{ marginLeft: "15px" }}>
          <div>
            <h3
              style={{
                fontWeight: "600",
                marginBottom: "12px",
                marginTop: "10px",
                color: "#076ac8",
              }}
            >
              {lessonDetail.name}
            </h3>
          </div>
          <div>{lessonDetail.description}</div>
          <div>{lessonDetail.content}</div>
        </div>
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default LessonDetail;
