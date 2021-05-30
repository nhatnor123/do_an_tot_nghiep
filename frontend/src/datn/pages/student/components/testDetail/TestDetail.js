import React from "react";
import {
  message,
  Form,
  Button,
  Col,
  Space,
  Checkbox,
  Statistic,
  Row,
  Tag,
} from "antd";
import Parser from "html-react-parser";
import moment from "moment";

import testApi from "../../../../api/TestApi";
import studentTestApi from "../../../../api/StudentTestApi";
import { getAccessToken } from "../../../../api/TokenUtil";
import "./TestDetail.css";

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
      const resp_2 = await studentTestApi.getOfStudentById(
        {
          testId: this.state.testId,
        },
        accessToken
      );
      console.log("resp 2 = ", resp_2);
      this.setState({
        testDetail: {
          ...response,
          modifiedContent: JSON.parse(response.content).modifiedContent,
          originContent: JSON.parse(response.content).originContent,
          answer: JSON.parse(response.answer),
        },
        studentTest: resp_2.isExisted
          ? {
              ...resp_2.studentTest,
              content: JSON.parse(resp_2.studentTest.content),
            }
          : null,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy thông tin chi tiết bài học thất bại", 3);
    }
  };

  handleSubmitTest = async (value) => {
    var accessToken = getAccessToken();

    console.log("value of TEST = ", value);
    var content = [];
    var score = 0;
    this.state.testDetail.answer.forEach((item, index) => {
      let x = value[index.toString()].map((z) => parseInt(z));
      content.push(x);
      let flag = true;
      for (let i = 0; i < x.length; i++) {
        if (!this.state.testDetail.answer[index].includes(x[i])) {
          flag = false;
          break;
        }
      }
      if (flag) {
        score += this.state.testDetail.originContent[index].score;
      }
    });

    var req = {
      testId: this.state.testId,
      content: JSON.stringify(content),
      score: score.toString(),
    };

    console.log("Req = ", req);

    try {
      const response = await studentTestApi.create(req, accessToken);
      console.log("resp = ", response);

      message.success("Nộp bài kiểm tra thành công", 3);
      this.getTestDetail();
    } catch (e) {
      console.error(e);
      message.error("Nộp bài kiểm tra thất bại", 3);
    }
  };

  render() {
    console.log("current state =", this.state);

    let testDetail = this.state.testDetail ? this.state.testDetail : null;

    return testDetail ? (
      <div>
        <Col offset={4} md={16}>
          <div style={{ marginTop: "20px" }}>
            <Row>
              <Col span={17}>
                <div
                  style={{
                    fontWeight: "600",
                    marginBottom: "12px",
                    marginTop: "10px",
                    fontSize: "35px",
                    color: "#076ac8 !important",
                  }}
                >
                  {testDetail.name}
                </div>
              </Col>
              <Col span={5} offset={2}>
                {this.state.studentTest == null ? (
                  <Statistic.Countdown
                    title={"Thời gian còn lại"}
                    value={moment(testDetail.dateTimeEnd)}
                  />
                ) : (
                  <Tag color="#00a76a" style={{ fontSize: "15px" }}>
                    Đã làm
                  </Tag>
                )}
              </Col>
            </Row>
          </div>
          <div style={{ marginBottom: "23px", fontSize: "17px" }}>
            {"Thời gian: " +
              testDetail.dateTimeStart.substring(0, 19) +
              " ----> " +
              testDetail.dateTimeEnd.substring(0, 19)}
          </div>
          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              fontSize: "17px",
            }}
          >
            <i>{testDetail.description}</i>
          </div>

          <div>
            <Form
              layout="vertical"
              hideRequiredMark
              scrollToFirstError
              onFinish={this.handleSubmitTest}
            >
              <Form.Item>
                {testDetail.modifiedContent.map((question, questionIndex) => {
                  let trueAnswers = testDetail.answer[questionIndex];

                  let yourAnswer = [];
                  if (this.state.studentTest !== null) {
                    yourAnswer = this.state.studentTest.content[questionIndex];
                  }

                  return this.state.studentTest == null ? (
                    <div>
                      <div style={{ fontSize: "18px" }}>
                        <b>{"Câu " + (questionIndex + 1)}</b>
                        {" (" + question.score + " đ) : " + question.question}
                      </div>
                      <Form.Item
                        name={questionIndex.toString()}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn đáp án đúng !",
                          },
                        ]}
                      >
                        <Checkbox.Group
                          options={question.option.map((ques, index) => {
                            return {
                              label: ques.value,
                              value: index.toString(),
                            };
                          })}
                        />
                      </Form.Item>
                    </div>
                  ) : (
                    <div>
                      <div style={{ color: "black", marginTop: "15px" }}>
                        <div style={{ fontSize: "18px" }}>
                          <b>{"Câu " + (questionIndex + 1)}</b>
                          {" (" + question.score + " đ) : " + question.question}
                        </div>
                        <div>
                          <Space direction="vertical">
                            {question.option.map((answer, answerIndex) => {
                              let isTrueAnswer = trueAnswers.includes(
                                answerIndex
                              );
                              let isChecked = yourAnswer.includes(answerIndex);
                              return (
                                <Checkbox
                                  defaultChecked={isChecked}
                                  style={{
                                    marginTop: "5px",
                                    fontSize: "15px",
                                    color: isTrueAnswer ? "red" : "black",
                                  }}
                                >
                                  {answer.value}
                                </Checkbox>
                              );
                            })}
                          </Space>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {this.state.studentTest == null ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: "20%", marginTop: "30px" }}
                    size="large"
                  >
                    Nộp bài
                  </Button>
                ) : (
                  <div style={{ fontSize: "18px", marginTop: "90px" }}>
                    <h3>Kết quả : {this.state.studentTest.score} điểm</h3>
                    <br></br>
                    <h3>Nhận xét của giáo viên: </h3>
                    <div> {Parser(this.state.studentTest.feedback)}</div>
                  </div>
                )}
              </Form.Item>
            </Form>
          </div>
        </Col>
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default TestDetail;
