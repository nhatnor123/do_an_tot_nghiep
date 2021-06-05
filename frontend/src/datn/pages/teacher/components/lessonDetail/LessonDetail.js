import React from "react";
import {
  message,
  Form,
  Modal,
  Button,
  Row,
  Col,
  Input,
  Popconfirm,
} from "antd";
import Parser from "html-react-parser";
import TextEditor from "../richTextEditor/TextEditor";

import Comment from "../comment/Comment";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import lessonApi from "../../../../api/LessonApi";
import { getAccessToken } from "../../../../api/TokenUtil";
import "./LessonDetail.css";

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
    let lessonDetail = this.state.lessonDetail;
    this.formRefUpdateLesson.current.setFieldsValue({
      name: lessonDetail.name,
      description: lessonDetail.description,
      content: lessonDetail.content,
    });
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
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Col span={5}>
            <Button
              type="primary"
              onClick={this.showModalUpdateLesson}
              style={{ margin: "1% 0px 1% 1%" }}
            >
              <EditOutlined /> Sửa
            </Button>
            <Popconfirm
              title="Xác nhận xóa bài học này ?"
              cancelText="Hủy"
              okText="Đồng ý"
              onConfirm={this.handleClickDeleteButton}
            >
              <Button type="primary" style={{ margin: "1% 0px 1% 20px" }}>
                <DeleteOutlined /> Xóa
              </Button>
            </Popconfirm>
          </Col>
        </Row>

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
                <TextEditor />
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
                onClick={this.handleResetFormUpdateLesson}
                htmlType="button"
              >
                Đặt lại
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <div
          style={{
            width: "70%",
            marginLeft: "10%",
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
