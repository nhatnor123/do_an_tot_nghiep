import React from "react";
import {
  Form,
  Input,
  Modal,
  Button,
  message,
  Row,
  Col,
  Radio,
  Space,
  InputNumber,
} from "antd";

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
      defaultTestData: [
        {
          type: "MULTI_CHOICE_ONE",
          autoCheck: true,
          score: 1,
          question: "",
          option: [
            {
              content: "",
            },
          ],
          answer: [0],
        },
      ],
      testData: [],
    };
  }

  componentDidMount() {
    this.getTestList();
    this.setState({
      testData: this.state.defaultTestData,
    });
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

  handleSubmitCreateNewTest = async (value) => {
    // var accessToken = getAccessToken();

    // console.log("value =", value);
    // try {
    //   const response = await LessonApi.create(
    //     {
    //       courseId: this.props.courseId,
    //       name: value.name,
    //       description: value.description,
    //       content: value.content,
    //     },
    //     accessToken
    //   );
    //   console.log("resp = ", response);

    //   message.success("Thêm mới bài học thành công", 3);
    //   this.onCloseModalCreateNewTest();
    //   this.getTestList();
    //   this.handleResetFormCreateNewTest();
    // } catch (e) {
    //   console.error(e);
    //   message.error("Thêm mới bài học thất bại", 3);
    // }

    console.log("value of Test is ", value);
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

  // defaultTestData: [
  //   {
  //     type: "MULTI_CHOICE_ONE",
  //     autoCheck: true,
  //     score: 1,
  //     question: "",
  //     option: [
  //       {
  //         content: "",
  //       },
  //     ],
  //     answer: [0],
  //   },
  // ],

  handleAddNewOption(testIdx) {
    console.log("state AHIHI = ", this.state);

    var testData = this.state.testData;

    this.setState({
      testData: [
        ...testData.slice(0, testIdx),
        {
          ...testData[testIdx],
          option: [...testData[testIdx].option, { content: "" }],
        },
        ...testData.slice(testIdx + 1, testData.length),
      ],
    });
  }

  handleDeleteOption(testIdx, optionIdx) {
    var testData = this.state.testData;

    this.setState({
      testData: [
        ...testData.slice(0, testIdx),
        {
          ...testData[testIdx],
          option: [
            ...testData[testIdx].option.slice(0, optionIdx),
            ...testData[testIdx].option.slice(
              optionIdx + 1,
              testData[testIdx].option.length
            ),
          ],
        },
        ...testData.slice(testIdx + 1, testData.length),
      ],
    });
  }

  handleAddNewQuestion = () => {
    this.setState({
      testData: [
        ...this.state.testData,
        {
          type: "MULTI_CHOICE_ONE",
          autoCheck: true,
          score: 1,
          question: "",
          option: [
            {
              content: "",
            },
          ],
          answer: [0],
        },
      ],
    });
  };

  handleDeleteQuestion = (index) => {
    var testData = this.state.testData;

    this.setState({
      testData: [
        ...testData.slice(0, index - 1),
        ...testData.slice(index + 1, testData.length),
      ],
    });
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
          width={850}
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
            onFinish={this.handleSubmitCreateNewTest}
            ref={this.formRefCreateNewTest}
          >
            <Form.Item {...tailFormItemLayout}>
              <Form.Item
                name="name"
                label={<div style={{ fontSize: "18px" }}>Tên</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền tên bài kiểm tra !",
                  },
                ]}
              >
                <Input style={inputStyle} />
              </Form.Item>

              <Form.Item
                name="description"
                label={<div style={{ fontSize: "18px" }}>Mô tả</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền mô tả bài kiểm tra !",
                  },
                ]}
              >
                <Input.TextArea
                  style={inputStyle}
                  autoSize={{ minRows: 3, maxRows: 6 }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <div style={{ fontSize: "19px" }}>Nội dung bài kiểm tra</div>
                }
              >
                {this.state.testData.map((test, index) => {
                  console.log("test = ", test);

                  if (test.type === "MULTI_CHOICE_ONE") {
                    return (
                      <Form.Item name={"TEST-" + (index + 1)}>
                        <Form.Item
                          name={"QUESTION-" + (index + 1)}
                          label={
                            <div style={{ fontSize: "17px" }}>
                              <b>{"Câu hỏi " + (index + 1)}</b>
                            </div>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng điền nội dung câu hỏi !",
                            },
                          ]}
                        >
                          <Input.TextArea
                            style={inputStyle}
                            autoSize={{ minRows: 3, maxRows: 6 }}
                          />
                        </Form.Item>
                        <Form.Item
                          name={"QUESTION-" + (index + 1) + "-SCORE"}
                          label={<div style={{ fontSize: "17px" }}>Điểm</div>}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng điền số điểm của câu hỏi !",
                            },
                          ]}
                        >
                          <InputNumber
                            size="large"
                            min={1}
                            max={99}
                            defaultValue={1}
                          />
                        </Form.Item>

                        <Form.Item
                          name="type"
                          label={<div style={labelStyle}>Kiểu câu hỏi</div>}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn kiểu câu hỏi",
                            },
                          ]}
                        >
                          <Radio.Group defaultValue={"MULTI_CHOICE_ONE"}>
                            <Space direction="vertical">
                              <Radio value="MULTI_CHOICE_ONE">
                                Trắc nghiệm 1 đáp án đúng
                              </Radio>
                              <Radio value="MULTI_CHOICE_MULTI">
                                Trắc nghiệm nhiều đáp án đúng
                              </Radio>
                              <Radio value="TEXT">Tự luận</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item
                          name="autoCheck"
                          label={
                            <div style={labelStyle}>Tự động chấm điểm</div>
                          }
                          rules={[
                            {
                              required: true,
                              message:
                                "Vui lòng chọn trạng thái của chế độ tự động chấm điểm",
                            },
                          ]}
                        >
                          <Radio.Group defaultValue={"true"}>
                            <Radio value="true">Bật</Radio>
                            <Radio value="false">Tắt</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item
                          label={<b style={{ fontSize: "17px" }}>Đáp án</b>}
                        >
                          {test.option.map((option, optionIndex) => {
                            console.log("option =", option);
                            return (
                              <Form.Item>
                                <Form.Item
                                  name={
                                    "QUESTION-" +
                                    (index + 1) +
                                    "-ANSWER-" +
                                    (optionIndex + 1)
                                  }
                                  label={
                                    <i style={{ fontSize: "16px" }}>
                                      {"Đáp án " + (optionIndex + 1)}
                                    </i>
                                  }
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Vui lòng điền nội dung của đáp án !",
                                    },
                                  ]}
                                >
                                  <Input.TextArea
                                    style={inputStyle}
                                    autoSize={{ minRows: 1, maxRows: 2 }}
                                  />
                                </Form.Item>
                                <Button
                                  type="primary"
                                  style={{ margin: "10px 10px 0px 30%" }}
                                  onClick={() => {
                                    this.handleDeleteOption(index, optionIndex);
                                  }}
                                  htmlType="button"
                                >
                                  Xóa đáp án này
                                </Button>
                              </Form.Item>
                            );
                          })}
                        </Form.Item>
                        <Button
                          type="primary"
                          style={{ marginLeft: "20px" }}
                          onClick={() => {
                            this.handleAddNewOption(index);
                          }}
                          htmlType="button"
                        >
                          Thêm đáp án
                        </Button>
                        <Button
                          type="primary"
                          style={{ marginLeft: "20px" }}
                          onClick={() => {
                            this.handleDeleteQuestion(index);
                          }}
                          htmlType="button"
                        >
                          Xóa câu hỏi này
                        </Button>
                      </Form.Item>
                    );
                  }
                })}
                <Button
                  type="primary"
                  style={{ marginLeft: "20px" }}
                  onClick={this.handleAddNewQuestion}
                  htmlType="button"
                >
                  Thêm câu hỏi
                </Button>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: "10px 10px 10px 10%" }}
              >
                Đồng ý
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
