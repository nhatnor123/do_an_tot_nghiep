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

class ManageTest extends React.Component {
  constructor(props) {
    super(props);
    this.formRefCreateNewTest = React.createRef();
    this.state = {
      isModalCreateNewTestVisible: false,
      testList: [],
    };
  }

  componentDidMount() {
    this.getTestList();
  }

  getTestList = async () => {
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
        testList: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách bài học thất bại", 3);
    }
  };

  showModalCreateNewTest = () => {
    this.setState({
      isModalCreateNewTestVisible: true,
    });
  };

  onCloseModalCreateNewTest = () => {
    this.setState({
      isModalCreateNewTestVisible: false,
    });
  };

  handleResetFormCreateNewTest = () => {
    this.formRefCreateNewTest.current.resetFields();
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
      this.onCloseModalCreateNewTest();
      this.getTestList();
      this.handleResetFormCreateNewTest();
    } catch (e) {
      console.error(e);
      message.error("Thêm mới bài học thất bại", 3);
    }
  };

  handleSearchTest = async (value, event) => {
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
        testList: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách bài học của giáo viên thất bại", 3);
    }
  };

  render() {
    console.log("render manageTest");
    console.log("state =", this.state);

    return (
      <div>
        <Row style={{ marginTop: "10px" }}>
          <Col span={5}>
            <Button
              type="primary"
              onClick={this.showModalCreateNewTest}
              style={{ margin: "1% 0px 1% 1%" }}
            >
              <PlusOutlined /> Thêm mới
            </Button>
          </Col>
          <Col offset={9}>
            <Input.Search
              placeholder="Tìm kiếm bài kiểm tra"
              onSearch={this.handleSearchTest}
              enterButton
            />
          </Col>
        </Row>

        <Modal
          title="Thêm mới bài kiểm tra"
          width={650}
          okButtonProps={{ disabled: true }}
          cancelText={"Thoát"}
          onCancel={this.onCloseModalCreateNewTest}
          visible={this.state.isModalCreateNewTestVisible}
          placement="right"
        >
          <Form
            layout="vertical"
            hideRequiredMark
            scrollToFirstError
            onFinish={this.handleSummitCreateNewLessson}
            ref={this.formRefCreateNewTest}
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
                onClick={this.handleResetFormCreateNewTest}
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
            lessonList={this.state.testList}
          />
        </div>
      </div>
    );
  }
}

export default ManageTest;
