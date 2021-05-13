import React from "react";
import { message, Form, Button, Col, Space, Checkbox } from "antd";

import testApi from "../../../../api/TestApi";
import { getAccessToken } from "../../../../api/TokenUtil";
import "./TestDetail.css";

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

  handleSubmitTest = async (value) => {
    console.log("value of TEST = ", value);
  };

  render() {
    console.log("current state =", this.state);

    let testDetail = this.state.testDetail ? this.state.testDetail : null;

    return testDetail ? (
      <div>
        <Col offset={4} md={16}>
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
            <Form
              layout="vertical"
              hideRequiredMark
              scrollToFirstError
              onFinish={this.handleSubmitTest}
            >
              <Form.Item>
                {testDetail.modifiedContent.map((question, questionIndex) => {
                  console.log("question ", questionIndex, " =", question);
                  let trueAnswers = testDetail.answer[questionIndex];
                  console.log("trueAnswer =", trueAnswers);
                  return (
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
                          options={question.option.map((item) => item.value)}
                        />
                      </Form.Item>
                    </div>
                  );
                })}

                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "20%", marginTop: "30px" }}
                  size="large"
                >
                  Nộp bài
                </Button>
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
