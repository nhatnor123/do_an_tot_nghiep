import React from "react";
import { Form, Input, Modal, Button, message, Row, Col } from "antd";

import LessonGrid from "../lessonGrid/LessonGrid";
import TextEditor from "../richTextEditor/TextEditor";

import { PlusOutlined } from "@ant-design/icons";

import LessonApi from "../../../../api/LessonApi";
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

class ManageLesson extends React.Component {
  constructor(props) {
    super(props);
    this.formRefCreateNewLesson = React.createRef();
    this.state = {
      isModalCreateNewLessonVisible: false,
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

  showModalCreateNewLesson = () => {
    this.setState({
      isModalCreateNewLessonVisible: true,
    });
  };

  onCloseModalCreateNewLesson = () => {
    this.setState({
      isModalCreateNewLessonVisible: false,
    });
  };

  handleResetFormCreateNewLesson = () => {
    this.formRefCreateNewLesson.current.resetFields();
  };

  handleSummitCreateNewLessson = async (value) => {
    var accessToken = getAccessToken();

    console.log("value =", value);
    try {
      const response = await LessonApi.create(
        {
          courseId: this.props.courseId,
          name: value.name,
          description: value.description,
          content: value.content,
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Thêm mới bài học thành công", 3);
      this.onCloseModalCreateNewLesson();
      this.getLessonList();
      this.handleResetFormCreateNewLesson();
    } catch (e) {
      console.error(e);
      message.error("Thêm mới bài học thất bại", 3);
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
        <Row style={{ marginTop: "10px" }}>
          <Col span={5}>
            <Button
              type="primary"
              onClick={this.showModalCreateNewLesson}
              style={{ margin: "1% 0px 1% 1%" }}
            >
              <PlusOutlined /> Thêm mới
            </Button>
          </Col>
          <Col offset={9}>
            <Input.Search
              placeholder="Tìm kiếm bài học"
              onSearch={this.handleSearchLesson}
              enterButton
            />
          </Col>
        </Row>

        <Modal
          title="Thêm mới bài học"
          width={650}
          okButtonProps={{ disabled: true }}
          cancelText={"Thoát"}
          onCancel={this.onCloseModalCreateNewLesson}
          visible={this.state.isModalCreateNewLessonVisible}
          placement="right"
        >
          <Form
            layout="vertical"
            hideRequiredMark
            scrollToFirstError
            onFinish={this.handleSummitCreateNewLessson}
            ref={this.formRefCreateNewLesson}
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
                Thêm mới
              </Button>
              <Button
                type="primary"
                style={{ margin: "10px 10px 0px 30%" }}
                onClick={this.handleResetFormCreateNewLesson}
                htmlType="button"
              >
                Đặt lại
              </Button>
            </Form.Item>
          </Form>
        </Modal>
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
