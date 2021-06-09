import React from "react";
import {
  Layout,
  Table,
  message,
  Input,
  Button,
  Space,
  Tooltip,
  Form,
  Modal,
  Checkbox,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, SnippetsOutlined } from "@ant-design/icons";

import TextEditor from "../../richTextEditor/TextEditor";

import studentCourseApi from "../../../../../api/StudentCourseApi";
import studentTestApi from "../../../../../api/StudentTestApi";
import testApi from "../../../../../api/TestApi";
import { getAccessToken } from "../../../../../api/TokenUtil";

import "./ManageStudentTest.css";

const { Content } = Layout;

message.config({
  top: 80,
});

class ManageStudentJoinCourse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      studentsNotJoinCourse: [],
      columns: [
        {
          title: "STT",
          dataIndex: "index",
          key: "index",
        },
        {
          title: "Tên đăng nhập",
          dataIndex: "username",
          key: "username",
          ...this.getColumnSearchProps("username"),
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          ...this.getColumnSearchProps("email"),
        },
        {
          title: "Họ",
          dataIndex: "firstName",
          key: "firstName",
          ...this.getColumnSearchProps("firstName"),
        },
        {
          title: "Tên",
          dataIndex: "lastName",
          key: "lastName",
          ...this.getColumnSearchProps("lastName"),
        },
        {
          title: "Trạng thái",
          dataIndex: "isTestDidText",
          key: "isTestDidText",
          ...this.getColumnSearchProps("isTestDidText"),
        },
        {
          title: "Điểm số",
          key: "score",
          render: (text, record) => {
            return record.testDetail ? record.testDetail.score : "";
          },
        },
        {
          title: "Thời điểm làm bài",
          dataIndex: "doAt",
          key: "doAt",
        },
        {
          title: "Thời điểm nhận xét",
          dataIndex: "feedbackAt",
          key: "feedbackAt",
        },
        {
          title: "",
          key: "accountId",
          render: (text, record) => (
            <Tooltip placement="top" title="Xem chi tiết bài kiểm tra này">
              <Button
                disabled={record.isTestDid === false}
                onClick={this.handleViewTest(record)}
              >
                <SnippetsOutlined />
              </Button>
            </Tooltip>
          ),
        },
      ],
      searchText: "",
      searchedColumn: "",
      isModalVisible: false,
    };
    this.formRef = React.createRef();
  }

  handleViewTest = (record) => {
    return async () => {
      console.log("record = ", record);
      var accessToken = getAccessToken();
      try {
        const response = await testApi.getById(
          {
            testId: this.props.testId,
          },
          accessToken
        );
        console.log("response = ", response);
        const resp_2 = record.testDetail;
        console.log("resp 2 = ", resp_2);
        this.setState({
          isModalVisible: true,
          testDetail: {
            ...response,
            modifiedContent: JSON.parse(response.content).modifiedContent,
            originContent: JSON.parse(response.content).originContent,
            answer: JSON.parse(response.answer),
          },
          studentTest: {
            ...resp_2,
            content: JSON.parse(resp_2.content),
          },
        });
        this.handleResetForm();
      } catch (e) {
        console.error(e);
        message.error("Lấy thông tin chi tiết bài học thất bại", 3);
      }
    };
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Nhập nội dung`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 100 }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Đặt lại
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  getStudentsJoinCourseList = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await studentCourseApi.getStudentsJoiningCourse(
        {
          courseId: this.props.courseId,
        },
        accessToken
      );
      console.log("dataSource = ", response);

      const response_2 = await studentTestApi.search(
        {
          testId: this.props.testId,
          fieldList: ["testId"],
        },
        accessToken
      );
      console.log("dataSource 2 = ", response_2);
      var studentListDidTest = response_2.map((item) => item.studentId);
      console.log("studentListDidTest =", studentListDidTest);
      let dataSourceResponsed = response.students.map((item, index) => {
        let isTestDid = studentListDidTest.includes(item.studentId);
        let temp = isTestDid
          ? response_2.filter((item2) => {
              return item2.studentId === item.studentId;
            })[0]
          : null;
        console.log("temp = ", temp);

        return {
          ...item,
          testDetail: temp,
          isTestDid,
          isTestDidText: isTestDid ? "Đã làm" : "Chưa làm",
          doAt: isTestDid ? temp.doAt : "",
          feedbackAt: isTestDid ? temp.feedbackAt : "",
          index: index + 1,
        };
      });

      this.setState({
        dataSource: dataSourceResponsed,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách tài khoản học viên thất bại", 3);
    }
  };

  handleSubmit = async (value) => {
    var accessToken = getAccessToken();
    console.log("value ===", value);

    try {
      const response = await studentTestApi.update(
        {
          testId: this.state.studentTest.testId,
          studentId: this.state.studentTest.studentId,
          feedback: value.feedback,
          fieldList: ["feedback", "feedbackAt"],
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Nhận xét bài kiểm tra thành công", 3);
      this.onClose();
      this.getStudentsJoinCourseList();
    } catch (e) {
      console.error(e);
      message.error("Nhận xét bài kiểm tra thất bại", 3);
    }
  };

  onClose = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  handleResetForm = () => {
    console.log("handle reset form");
    console.log("this feedback ", this.state.studentTest.feedback);
    this.formRef.current.resetFields();
    this.formRef.current.setFieldsValue({
      feedback: this.state.studentTest.feedback,
    });
  };

  componentDidMount() {
    this.getStudentsJoinCourseList();
  }

  render() {
    console.log("render manageStudentJoinCourse");
    let testDetail = this.state.testDetail;

    console.log("STATE = ", this.state);

    return (
      <Layout className="site-layout">
        <Content style={{ overflow: "initial" }}>
          <div className="site-layout-background" style={{ marginTop: "15px" }}>
            <div>
              {testDetail ? (
                <Modal
                  title="Xem bài làm của học viên"
                  width={1000}
                  okButtonProps={{ disabled: true }}
                  cancelText={"Thoát"}
                  onCancel={this.onClose}
                  visible={this.state.isModalVisible}
                  placement="right"
                >
                  <Form
                    layout="vertical"
                    hideRequiredMark
                    scrollToFirstError
                    onFinish={this.handleSubmit}
                    ref={this.formRef}
                  >
                    <Form.Item>
                      {testDetail.modifiedContent.map(
                        (question, questionIndex) => {
                          let trueAnswers = testDetail.answer[questionIndex];

                          let yourAnswer = [];
                          if (this.state.studentTest !== null) {
                            yourAnswer = this.state.studentTest.content[
                              questionIndex
                            ];
                          }

                          return this.state.studentTest == null ? (
                            <div>
                              <div style={{ fontSize: "18px" }}>
                                <b>{"Câu " + (questionIndex + 1)}</b>
                                {" (" +
                                  question.score +
                                  " đ) : " +
                                  question.question}
                              </div>

                              <Checkbox.Group
                                options={question.option.map((ques, index) => {
                                  return {
                                    label: ques.value,
                                    value: index.toString(),
                                  };
                                })}
                              />
                            </div>
                          ) : (
                            <div>
                              <div
                                style={{ color: "black", marginTop: "15px" }}
                              >
                                <div style={{ fontSize: "18px" }}>
                                  <b>{"Câu " + (questionIndex + 1)}</b>
                                  {" (" +
                                    question.score +
                                    " đ) : " +
                                    question.question}
                                </div>
                                <div>
                                  <Space direction="vertical">
                                    {question.option.map(
                                      (answer, answerIndex) => {
                                        let isTrueAnswer = trueAnswers.includes(
                                          answerIndex
                                        );
                                        let isChecked = yourAnswer.includes(
                                          answerIndex
                                        );
                                        return (
                                          <Checkbox
                                            defaultChecked={isChecked}
                                            style={{
                                              marginTop: "5px",
                                              fontSize: "15px",
                                              color: isTrueAnswer
                                                ? "red"
                                                : "black",
                                            }}
                                          >
                                            {answer.value}
                                          </Checkbox>
                                        );
                                      }
                                    )}
                                  </Space>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}

                      {this.state.studentTest == null ? (
                        <div></div>
                      ) : (
                        <div style={{ fontSize: "18px", marginTop: "90px" }}>
                          <h3>Kết quả : {this.state.studentTest.score} điểm</h3>
                          <br></br>
                          <h3>Nhận xét của giáo viên: </h3>
                          <Form.Item
                            name="feedback"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng điền nhận xét !",
                              },
                            ]}
                          >
                            <TextEditor />
                          </Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginLeft: "20%", marginTop: "30px" }}
                            size="middle"
                          >
                            Nhận xét
                          </Button>
                          <Button
                            type="primary"
                            style={{ margin: "10px 10px 0px 30%" }}
                            onClick={this.handleResetForm}
                            htmlType="button"
                          >
                            Đặt lại
                          </Button>
                        </div>
                      )}
                    </Form.Item>
                  </Form>
                </Modal>
              ) : (
                <div></div>
              )}
              <Table
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                scroll={{ x: "calc(100%)" }}
                pagination={{ position: ["bottomRight"] }}
                bordered
              />
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default ManageStudentJoinCourse;
