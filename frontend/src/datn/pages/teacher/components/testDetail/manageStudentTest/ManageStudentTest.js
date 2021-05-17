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
    this.formRefAddNewStudentToCourse = React.createRef();
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
          doAt: isTestDid ? temp.doAt.substring(0, temp.doAt.length - 10) : "",
          feedbackAt: isTestDid
            ? temp.feedbackAt.substring(0, temp.feedbackAt.length - 10)
            : "",
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

  handleSummitCreateNewAccount = async (value) => {
    var accessToken = getAccessToken();

    if (!this.state.fileList[0]) {
      message.error("Vui lòng gửi ảnh đại diện lên !");
      return;
    }

    try {
      const response = await studentCourseApi.create(
        {
          username: value.username,
          password: value.password,
          email: value.email,
          firstName: value.firstName,
          lastName: value.lastName,
          role: value.role,
          phoneNo: value.phoneNo,
          address: value.address,
          imageUrl: this.state.fileList[0].response.fileDownloadUri,
          birthday: value.birthday,
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Thêm mới tài khoản thành công", 3);
      this.setState({
        visible: false,
      });
      this.getStudentsJoinCourseList();
    } catch (e) {
      console.error(e);
      message.error("Thêm mới tài khoản thất bại", 3);
    }
  };

  showModalAddNewStudentToCourse = () => {
    this.setState({
      isModalAddNewStudentToCourseVisible: true,
    });
  };

  onCloseModalAddNewStudentToCourse = () => {
    this.setState({
      isModalAddNewStudentToCourseVisible: false,
    });
  };

  handleSummitAddNewStudentToCourse = async (value) => {
    var accessToken = getAccessToken();

    console.log("value=", value);
    var studentIds = [];
    var studentUsernames = value.name;

    this.state.studentsNotJoinCourse.forEach((student) => {
      if (studentUsernames.includes(student.username)) {
        studentIds.push(student.studentId);
      }
    });

    console.log("studentIds =", studentIds);

    if (studentIds.length === 0) {
      message.error("Học viên không tồn tại trong hệ thống", 3);
      return;
    }

    try {
      const response = await studentCourseApi.create(
        {
          courseId: this.props.courseId,
          studentIds,
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Thêm mới học viên vào khóa học thành công", 3);
      this.onCloseModalAddNewStudentToCourse();
      this.getStudentsJoinCourseList();
      this.formRefAddNewStudentToCourse.current.setFieldsValue({
        name: "",
      });
    } catch (e) {
      console.error(e);
      message.error("Thêm mới học viên vào khóa học thất bại", 3);
    }
  };

  onClose = () => {
    this.setState({
      isModalVisible: false,
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
                    onFinish={this.handleSummitCreateNewAccount}
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
                                  options={question.option.map(
                                    (ques, index) => {
                                      return {
                                        label: ques.value,
                                        value: index.toString(),
                                      };
                                    }
                                  )}
                                />
                              </Form.Item>
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
                          <b>Kết quả : {this.state.studentTest.score} điểm</b>
                          <br></br>
                          <b>Nhận xét của giáo viên: </b>
                          <div>{this.state.studentTest.feedback}</div>
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
