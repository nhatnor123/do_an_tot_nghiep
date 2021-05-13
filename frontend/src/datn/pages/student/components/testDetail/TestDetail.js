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
  Space,
  Radio,
  InputNumber,
  DatePicker,
  TimePicker,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

import testApi from "../../../../api/TestApi";
import { getAccessToken } from "../../../../api/TokenUtil";
import "./TestDetail.css";
import Checkbox from "antd/lib/checkbox/Checkbox";

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

class TestDetail extends React.Component {
  constructor(props) {
    super(props);
    this.formRefUpdateTest = React.createRef();
    this.state = {
      courseId: props.match.params.courseId,
      testId: props.match.params.testId,
      isModalUpdateTestVisible: false,
    };
  }

  componentDidMount() {
    this.getTestDetail();
  }

  getTestDetail = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await testApi.getById(
        {
          testId: this.state.testId,
        },
        accessToken
      );
      console.log("response = ", response);
      this.setState({
        testDetail: {
          ...response,
          modifiedContent: JSON.parse(response.content).modifiedContent,
          originContent: JSON.parse(response.content).originContent,
          answer: JSON.parse(response.answer),
        },
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy thông tin chi tiết bài học thất bại", 3);
    }
  };

  showModalUpdateTest = () => {
    this.setState({
      isModalUpdateTestVisible: true,
    });
  };

  onCloseModalUpdateTest = () => {
    this.setState({
      isModalUpdateTestVisible: false,
    });
  };

  handleResetFormUpdateTest = () => {
    this.formRefUpdateTest.current.resetFields();
    let testDetail = this.state.testDetail;
    this.formRefUpdateTest.current.setFieldsValue({
      name: testDetail.name,
      description: testDetail.description,
      content: [...testDetail.originContent],
      dateStart: moment(testDetail.dateTimeStart),
      timeStart: moment(testDetail.dateTimeStart),
      dateEnd: moment(testDetail.dateTimeEnd),
      timeEnd: moment(testDetail.dateTimeEnd),
    });
  };

  handleSubmitUpdateTest = async (value) => {
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
      testId: this.state.testId,
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
      fieldList: [
        "name",
        "description",
        "content",
        "answer",
        "dateTimeStart",
        "dateTimeEnd",
      ],
    };
    console.log(req);

    try {
      const response = await testApi.update(req, accessToken);
      console.log("resp = ", response);

      message.success("Cập nhật thông tin bài kiểm tra thành công", 3);
      this.onCloseModalUpdateTest();
      this.getTestDetail();
      this.handleResetFormUpdateTest();
    } catch (e) {
      console.error(e);
      message.error("Cập nhật thông tin bài kiểm tra thất bại", 3);
    }
  };

  handleClickDeleteButton = async () => {
    var accessToken = getAccessToken();

    try {
      const response = await testApi.archive(
        {
          testId: this.state.testId,
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Xóa bài kiểm tra thành công", 3);
      this.props.history.push(
        `/teacher/manageCourse/course/${this.state.courseId}`
      );
    } catch (e) {
      console.error(e);
      message.error("Xóa bài kiểm tra thất bại", 3);
    }
  };

  render() {
    console.log("current state =", this.state);

    let testDetail = this.state.testDetail ? this.state.testDetail : null;

    return testDetail ? (
      <div>
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Col span={5}>
            <Button
              type="primary"
              onClick={this.showModalUpdateTest}
              style={{ margin: "1% 0px 1% 1%" }}
            >
              <EditOutlined /> Sửa
            </Button>
            <Popconfirm
              title="Xác nhận xóa bài kiểm tra này ?"
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
          title="Sửa bài kiểm tra"
          width={850}
          okButtonProps={{ disabled: true }}
          cancelText={"Thoát"}
          onCancel={this.onCloseModalUpdateTest}
          visible={this.state.isModalUpdateTestVisible}
          placement="right"
        >
          <Form
            layout="vertical"
            hideRequiredMark
            scrollToFirstError
            onFinish={this.handleSubmitUpdateTest}
            ref={this.formRefUpdateTest}
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
                              style={{ marginLeft: "40%", marginTop: "10px" }}
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
              <Button
                type="primary"
                style={{ margin: "10px 10px 0px 30%" }}
                onClick={this.handleResetFormUpdateTest}
                htmlType="button"
              >
                Đặt lại
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Row>
          <Col offset={3}>
            <div
              style={{
                marginLeft: "25px",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: "600",
                    marginBottom: "12px",
                    marginTop: "10px",
                    fontSize: "35px",
                  }}
                >
                  {testDetail.name}
                </div>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  fontSize: "16px",
                }}
              >
                <i>{testDetail.description}</i>
              </div>
              <div style={{ marginBottom: "13px", fontSize: "16px" }}>
                {"Thời gian: " +
                  testDetail.dateTimeStart.substring(0, 19) +
                  " ----> " +
                  testDetail.dateTimeEnd.substring(0, 19)}
              </div>
              <div>
                {testDetail.modifiedContent.map((question, questionIndex) => {
                  console.log("question ", questionIndex, " =", question);
                  let trueAnswers = testDetail.answer[questionIndex];
                  console.log("trueAnswer =", trueAnswers);
                  return (
                    <div style={{ color: "black", marginTop: "15px" }}>
                      <div style={{ fontSize: "18px" }}>
                        {"Câu " +
                          (questionIndex + 1) +
                          ": " +
                          question.question}
                      </div>
                      <div>
                        <Space direction="vertical">
                          {question.option.map((answer, answerIndex) => {
                            return (
                              <Checkbox
                                style={{
                                  marginTop: "5px",
                                  fontSize: "15px",
                                }}
                              >
                                {answer.value}
                              </Checkbox>
                            );
                          })}
                        </Space>
                      </div>
                    </div>
                  );
                })}
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

export default TestDetail;
