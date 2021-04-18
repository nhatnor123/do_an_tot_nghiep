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
} from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  PlusOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";

import studentCourseApi from "../../../../api/StudentCourseApi";
import { getAccessToken } from "../../../../api/TokenUtil";

import "./ManageStudentJoinCourse.css";

const { Content } = Layout;

message.config({
  top: 80,
});

class ManageStudentJoinCourse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
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
          title: "Vai trò",
          dataIndex: "role",
          key: "role",
          ...this.getColumnSearchProps("role"),
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
          title: "SĐT",
          dataIndex: "phoneNo",
          key: "phoneNo",
          ...this.getColumnSearchProps("phoneNo"),
        },
        {
          title: "Địa chỉ",
          dataIndex: "address",
          key: "address",
          ...this.getColumnSearchProps("address"),
        },
        {
          title: "Ngày sinh",
          dataIndex: "birthday",
          key: "birthday",
        },
        {
          title: "Trạng thái",
          dataIndex: "isActiveText",
          key: "isActiveText",
          ...this.getColumnSearchProps("isActiveText"),
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
              title="Xác nhận khóa tài khoản này ?"
              cancelText="Hủy"
              okText="Đồng ý"
              onConfirm={this.handleLockAccount(record.accountId)}
              disabled={record.isActive === false}
            >
              <Tooltip placement="top" title="Khóa tài khoản">
                <Button disabled={record.isActive === false}>
                  <LockOutlined />
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
              title="Xác nhận mở khóa tài khoản này ?"
              cancelText="Hủy"
              okText="Đồng ý"
              onConfirm={this.handleUnlockAccount(record.accountId)}
              disabled={record.isActive === true}
              placement="topLeft"
            >
              <Tooltip placement="topLeft" title="Mở khóa tài khoản">
                <Button disabled={record.isActive === true}>
                  <UnlockOutlined />
                </Button>
              </Tooltip>
            </Popconfirm>
          ),
        },
      ],
      searchText: "",
      searchedColumn: "",
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
    };
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

  getAccountList = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await studentCourseApi.search(
        {
          studentId: 0,
          courseId: this.props.courseId,
          email: "",
          isApproved: false,
          createdAtFrom: "",
          createdAtTo: "",
          updatedAtFrom: "",
          updatedAtTo: "",
          fieldList: ["courseId"],
        },
        accessToken
      );
      console.log("res = ", response);
      let dataSourceResponsed = response.map((item, index) => {
        return {
          ...item,
          isActiveText: item.isActive ? "Đang hoạt động" : "Bị khóa",
          birthday: item.birthday.substring(0, item.birthday.length - 19),
          createdAt: item.createdAt.substring(0, item.createdAt.length - 10),
          updatedAt: item.updatedAt.substring(0, item.updatedAt.length - 10),
          index: index + 1,
        };
      });
      this.setState({ dataSource: dataSourceResponsed });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách tài khoản người dùng thất bại", 3);
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
      this.getAccountList();
      this.handleResetForm();
    } catch (e) {
      console.error(e);
      message.error("Thêm mới tài khoản thất bại", 3);
      // this.setState({
      //   visible: false,
      // });
    }
  };

  handleLockAccount(accountId) {
    return async () => {
      var accessToken = getAccessToken();

      try {
        const response = await studentCourseApi.lock(
          {
            accountId,
          },
          accessToken
        );
        console.log("res = ", response);
        this.getAccountList();
        message.success("Khóa tài khoản thành công", 3);
      } catch (e) {
        console.error(e);
        message.error("Khóa tài khoản thất bại", 3);
      }
    };
  }

  handleUnlockAccount(accountId) {
    return async () => {
      var accessToken = getAccessToken();

      try {
        const response = await studentCourseApi.unlock(
          {
            accountId,
          },
          accessToken
        );
        console.log("res = ", response);
        this.getAccountList();
        message.success("Mở khóa tài khoản thành công", 3);
      } catch (e) {
        console.error(e);
        message.error("Mở khóa tài khoản thất bại", 3);
      }
    };
  }

  handleResetForm = () => {
    this.formRef.current.resetFields();
  };

  componentDidMount() {
    this.getAccountList();
  }

  render() {
    console.log("render manageUserAccount");

    return (
      <Layout className="site-layout">
        <Content style={{ overflow: "initial" }}>
          <div className="site-layout-background">
            <div>
              <Button
                type="primary"
                onClick={this.showDrawer}
                style={{ margin: "1% 0px 1% 1%" }}
              >
                <PlusOutlined /> Thêm mới
              </Button>
            </div>
            <div>
              <Table
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                expandable={{
                  expandedRowRender: (record) => {
                    let data;
                    if (record.role === "TEACHER") {
                      data = record.teacher;
                      return data ? (
                        <div style={{ marginLeft: "40px" }}>
                          <p>Tên hiển thị: {data.displayName}</p>
                          <p>Mô tả: {data.description}</p>
                          <p>
                            Trạng thái:{" "}
                            {data.isPublic ? "Công khai" : "Không công khai"}
                          </p>
                        </div>
                      ) : (
                        <div></div>
                      );
                    } else if (record.role === "STUDENT") {
                      data = record.student;
                      return data ? (
                        <div style={{ marginLeft: "40px" }}>
                          <p>Tên hiển thị {data.displayName}</p>
                          <p>Mô tả: {data.description}</p>
                        </div>
                      ) : (
                        <div></div>
                      );
                    }
                  },
                  rowExpandable: (record) => {
                    return (
                      (record.role === "TEACHER" && record.teacher) ||
                      (record.role === "STUDENT" && record.student)
                    );
                  },
                }}
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
