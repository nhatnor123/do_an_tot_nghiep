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
  DatePicker,
  TimePicker,
} from "antd";

import TestGrid from "../testGrid/TestGrid";

import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

import TestApi from "../../../../api/TestApi";
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
      const response = await TestApi.search(
        {
          testId: 0,
          courseId: this.props.courseId,
          name: "",
          description: "",
          content: "",
          answer: "",
          dateTimeStartFrom: "",
          dateTimeStartTo: "",
          dateTimeEndFrom: "",
          dateTimeEndTo: "",
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
      message.error("Lấy danh sách bài kiểm tra thất bại", 3);
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
    var accessToken = getAccessToken();

    var answer = [];

    var modifiedContent = value.content.map((content) => {
      let trueAnswer = [];
      let response = {
        question: content.question,
        option: content.option.map((option, optionIndex) => {
          if (option.isTrueAnswer === "true") {
            trueAnswer.push(optionIndex);
          }
          return {
            value: option.value,
          };
        }),
        type: content.type,
        autoCheck: content.autoCheck === "true" ? true : false,
        score: content.score,
      };
      answer.push(trueAnswer);

      return response;
    });

    var req = {
      courseId: this.props.courseId,
      name: value.name,
      description: value.description,
      content: JSON.stringify({
        originContent: value.content,
        modifiedContent,
      }),
      answer: JSON.stringify(answer),
      dateTimeStart:
        value.dateStart.format("YYYY-MM-DD HH:mm:ss").substring(0, 11) +
        value.timeStart.format("YYYY-MM-DD HH:mm:ss").substring(11, 19),
      dateTimeEnd:
        value.dateEnd.format("YYYY-MM-DD HH:mm:ss").substring(0, 11) +
        value.timeEnd.format("YYYY-MM-DD HH:mm:ss").substring(11, 19),
    };
    console.log(req);
    try {
      const response = await TestApi.create(req, accessToken);
      console.log("resp = ", response);
      message.success("Thêm mới bài kiểm tra thành công", 3);
      this.onCloseModalCreateNewTest();
      this.getTestList();
      this.handleResetFormCreateNewTest();
    } catch (e) {
      console.error(e);
      message.error("Thêm mới bài kiểm tra thất bại", 3);
    }
  };

  handleSearchTest = async (value, event) => {
    var accessToken = getAccessToken();
    try {
      const response = await TestApi.search(
        {
          testId: 0,
          courseId: this.props.courseId,
          name: value,
          description: "",
          content: "",
          answer: "",
          dateTimeStartFrom: "",
          dateTimeStartTo: "",
          dateTimeEndFrom: "",
          dateTimeEndTo: "",
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

  handleAddNewOption(testIdx) {
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
                name="dateStart"
                label={<div style={{ fontSize: "18px" }}>Ngày bắt đầu</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền ngày bắt đầu của bài kiểm tra !",
                  },
                ]}
              >
                <DatePicker size="middle" />
              </Form.Item>

              <Form.Item
                name="timeStart"
                label={<div style={{ fontSize: "18px" }}>Giờ bắt đầu</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền giờ bắt đầu của bài kiểm tra !",
                  },
                ]}
              >
                <TimePicker size="middle" />
              </Form.Item>

              <Form.Item
                name="dateEnd"
                label={<div style={{ fontSize: "18px" }}>Ngày kết thúc</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền ngày kết thúc của bài kiểm tra !",
                  },
                ]}
              >
                <DatePicker size="middle" />
              </Form.Item>

              <Form.Item
                name="timeEnd"
                label={<div style={{ fontSize: "18px" }}>Giờ kết thúc</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền giờ kết thúc của bài kiểm tra !",
                  },
                ]}
              >
                <TimePicker size="middle" />
              </Form.Item>

              <Form.List
                name="content"
                label={
                  <div style={{ fontSize: "19px" }}>Nội dung bài kiểm tra</div>
                }
              >
                {(questions, { add, remove }) => {
                  return (
                    <div>
                      {questions.map((question, index) => {
                        return (
                          <div style={{ marginTop: "10px" }}>
                            <Form.Item
                              name={[index, "question"]}
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
                              name={[index, "score"]}
                              label={
                                <div style={{ fontSize: "17px" }}>Điểm</div>
                              }
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Vui lòng điền số điểm của câu hỏi !",
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
                              name={[index, "type"]}
                              label={<div style={labelStyle}>Kiểu câu hỏi</div>}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn kiểu câu hỏi",
                                },
                              ]}
                            >
                              <Radio.Group>
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
                              name={[index, "autoCheck"]}
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
                              <Radio.Group>
                                <Radio value="true">Bật</Radio>
                                <Radio value="false">Tắt</Radio>
                              </Radio.Group>
                            </Form.Item>

                            <Form.List
                              name={[index, "option"]}
                              label={
                                <div style={{ fontSize: "19px" }}>
                                  Nội dung bài kiểm tra
                                </div>
                              }
                            >
                              {(options, { add, remove }) => {
                                return (
                                  <div>
                                    {options.map((option, optionIndex) => {
                                      return (
                                        <div style={{ marginTop: "10px" }}>
                                          <Form.Item
                                            name={[optionIndex, "value"]}
                                            label={
                                              <div style={{ fontSize: "17px" }}>
                                                <b>
                                                  {"Đáp án " +
                                                    (optionIndex + 1)}
                                                </b>
                                              </div>
                                            }
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Vui lòng điền đáp án !",
                                              },
                                            ]}
                                          >
                                            <Input.TextArea
                                              style={inputStyle}
                                              autoSize={{
                                                minRows: 1,
                                                maxRows: 3,
                                              }}
                                            />
                                          </Form.Item>
                                          <Form.Item
                                            name={[optionIndex, "isTrueAnswer"]}
                                            label={
                                              <div style={labelStyle}>
                                                Là đáp án đúng
                                              </div>
                                            }
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Vui lòng chọn trạng thái của đáp án",
                                              },
                                            ]}
                                          >
                                            <Radio.Group>
                                              <Radio value="true">Đúng</Radio>
                                              <Radio value="false">Sai</Radio>
                                            </Radio.Group>
                                          </Form.Item>

                                          <Button
                                            type="danger"
                                            style={{
                                              marginLeft: "40%",
                                              marginTop: "10px",
                                            }}
                                            onClick={() => remove(option.name)}
                                            icon={<MinusCircleOutlined />}
                                          >
                                            Xóa đáp án {optionIndex + 1}
                                          </Button>
                                        </div>
                                      );
                                    })}
                                    <Button
                                      type="dashed"
                                      style={{
                                        marginLeft: "40%",
                                        marginTop: "30px",
                                      }}
                                      onClick={() => {
                                        add();
                                      }}
                                      htmlType="button"
                                    >
                                      <PlusOutlined /> Thêm đáp án
                                    </Button>
                                  </div>
                                );
                              }}
                            </Form.List>

                            <Button
                              type="danger"
                              style={{ marginLeft: "40%", marginTop: "30px" }}
                              onClick={() => remove(question.name)}
                              icon={<MinusCircleOutlined />}
                            >
                              Xóa câu hỏi {index + 1}
                            </Button>
                          </div>
                        );
                      })}
                      <Button
                        type="dashed"
                        style={{ marginLeft: "40%", marginTop: "30px" }}
                        onClick={() => {
                          add();
                        }}
                        htmlType="button"
                      >
                        <PlusOutlined /> Thêm câu hỏi
                      </Button>
                    </div>
                  );
                }}
              </Form.List>

              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: "40px 10px 0px 20px" }}
              >
                Đồng ý
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div>
          <TestGrid
            courseId={this.props.courseId}
            testList={this.state.testList}
          />
        </div>
      </div>
    );
  }
}

export default ManageTest;
