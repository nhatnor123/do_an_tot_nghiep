import React from "react";
import {
  Layout,
  Table,
  message,
  Input,
  Button,
  Space,
  Tooltip,
  Popconfirm,
  Modal,
  Form,
  Select,
  Tag,
} from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import studentCourseApi from "../../../../api/StudentCourseApi";
import { getAccessToken } from "../../../../api/TokenUtil";

import "./ManageStudentJoinCourse.css";

const { Content } = Layout;

function tagRender(props) {
  const { value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={"green"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {value}
    </Tag>
  );
}

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
          dataIndex: "isApprovedText",
          key: "isApprovedText",
          ...this.getColumnSearchProps("isApprovedText"),
        },
        {
          title: "Thời điểm tạo",
          dataIndex: "createdAt",
          key: "createdAt",
        },
        {
          title: "Thời điểm cập nhật",
          dataIndex: "updatedAt",
          key: "updatedAt",
        },
        {
          title: "",
          key: "accountId",
          render: (text, record) => (
            <Popconfirm
              title="Xác nhận phê duyệt học viên này tham gia khóa học ?"
              cancelText="Hủy"
              okText="Đồng ý"
              onConfirm={this.handleApproveStudentJoinCourse(record.studentId)}
              disabled={record.isApproved === true}
            >
              <Tooltip placement="top" title="Phê duyệt học viên">
                <Button disabled={record.isApproved === true}>
                  <CheckOutlined />
                </Button>
              </Tooltip>
            </Popconfirm>
          ),
        },
        {
          title: "",
          key: "accountId",
          render: (text, record) => (
            <Popconfirm
              title="Xác nhận xóa học viên này khỏi khóa học ?"
              cancelText="Hủy"
              okText="Đồng ý"
              onConfirm={this.handleDeleteStudentToCourse(record.studentId)}
              placement="topLeft"
            >
              <Tooltip placement="topLeft" title="Xóa học viên">
                <Button>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </Popconfirm>
          ),
        },
      ],
      searchText: "",
      searchedColumn: "",
      isModalAddNewStudentToCourseVisible: false,
    };
    this.formRefAddNewStudentToCourse = React.createRef();
  }

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
      let dataSourceResponsed = response.students.map((item, index) => {
        return {
          ...item,
          isApprovedText: item.isApproved ? "Đã phê duyệt" : "Chờ phê duyệt",
          createdAt: item.createdAt.substring(0, item.createdAt.length - 10),
          updatedAt: item.updatedAt.substring(0, item.updatedAt.length - 10),
          index: index + 1,
        };
      });
      const result = await studentCourseApi.getStudentsNotJoinCourse(
        {
          courseId: this.props.courseId,
        },
        accessToken
      );
      console.log("studentsNotJoinCourse = ", result);
      this.setState({
        dataSource: dataSourceResponsed,
        studentsNotJoinCourse: result.students,
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

  handleApproveStudentJoinCourse(studentId) {
    return async () => {
      var accessToken = getAccessToken();

      try {
        const response = await studentCourseApi.update(
          {
            studentId,
            courseId: this.props.courseId,
            isApproved: true,
          },
          accessToken
        );
        console.log("res = ", response);
        this.getStudentsJoinCourseList();
        message.success("Phê duyệt học viên tham gia khóa học thành công", 3);
      } catch (e) {
        console.error(e);
        message.error("Phê duyệt học viên tham gia khóa học thất bại", 3);
      }
    };
  }

  handleDeleteStudentToCourse(studentId) {
    return async () => {
      var accessToken = getAccessToken();

      try {
        const response = await studentCourseApi.archive(
          {
            studentId,
            courseId: this.props.courseId,
          },
          accessToken
        );
        console.log("res = ", response);
        this.getStudentsJoinCourseList();
        message.success("Xóa học viên khỏi khóa học thành công", 3);
      } catch (e) {
        console.error(e);
        message.error("Xóa học viên khỏi khóa học thất bại", 3);
      }
    };
  }

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

  componentDidMount() {
    this.getStudentsJoinCourseList();
  }

  render() {
    console.log("render manageStudentJoinCourse");

    return (
      <Layout className="site-layout">
        <Content style={{ overflow: "initial" }}>
          <div className="site-layout-background">
            <div>
              <Button
                type="primary"
                onClick={this.showModalAddNewStudentToCourse}
                style={{ margin: "1% 0px 1% 1%" }}
              >
                <PlusOutlined /> Thêm học viên
              </Button>
            </div>
            <Modal
              title="Thêm học viên"
              width={650}
              okButtonProps={{ disabled: true }}
              cancelText={"Thoát"}
              onCancel={this.onCloseModalAddNewStudentToCourse}
              visible={this.state.isModalAddNewStudentToCourseVisible}
              placement="right"
            >
              <Form
                layout="vertical"
                hideRequiredMark
                scrollToFirstError
                onFinish={this.handleSummitAddNewStudentToCourse}
                ref={this.formRefAddNewStudentToCourse}
              >
                <Form.Item {...tailFormItemLayout}>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên học viên !",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      showArrow
                      tagRender={tagRender}
                      style={{ width: "100%" }}
                      options={this.state.studentsNotJoinCourse.map(
                        (student) => {
                          return {
                            value: student.username,
                            label:
                              student.username +
                              " (" +
                              (student.displayName.length !== 0
                                ? student.displayName
                                : student.firstName) +
                              " " +
                              student.lastName +
                              " - " +
                              student.email +
                              ")",
                          };
                        }
                      )}
                    />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ margin: "auto" }}
                  >
                    Thêm
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <div>
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
