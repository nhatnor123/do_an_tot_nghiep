import React from "react";
import {
  Layout,
  Table,
  message,
  Input,
  Button,
  Space,
  Drawer,
  Form,
  Tooltip,
  Popconfirm,
  Radio,
  DatePicker,
} from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";

import accountApi from "../../../../api/AccountApi";
import { getAccessToken } from "../../../../api/TokenUtil";

import "./ManageUserAccount.css";

const { Content } = Layout;

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

class ManageUserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
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
        // {
        //   title: "",
        //   key: "accountId",
        //   render: (text, record) => (
        //     <Popconfirm
        //       title="Xác nhận khóa tài khoản này ?"
        //       cancelText="Hủy"
        //       okText="Đồng ý"
        //       onConfirm={this.handleLockAccount(record.accountId)}
        //       disabled={record.isActive === false}
        //     >
        //       <Button disabled={record.isActive === false}>
        //         <EyeOutlined />
        //       </Button>
        //     </Popconfirm>
        //   ),
        // },
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
              <Tooltip placement="top" title="Mở khóa tài khoản">
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
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
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

  getAccountList = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await accountApi.search(
        {
          accountId: "",
          username: "",
          email: "",
          firstName: "",
          lastName: "",
          role: "ADMIN",
          phoneNo: "",
          address: "",
          birthdayFrom: "",
          birthdayTo: "",
          isActive: false,
          createdAtFrom: "",
          createdAtTo: "",
          updatedAtFrom: "",
          updatedAtTo: "",
          fieldList: [],
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

    try {
      const response = await accountApi.create(
        {
          username: value.username,
          password: value.password,
          email: value.email,
          firstName: value.firstName,
          lastName: value.lastName,
          role: value.role,
          phoneNo: value.phoneNo,
          address: value.address,
          imageUrl: value.imageUrl,
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
        const response = await accountApi.lock(
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
        const response = await accountApi.unlock(
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
              <Drawer
                title="Thêm mới tài khoản"
                width={500}
                onClose={this.onClose}
                visible={this.state.visible}
                bodyStyle={{ paddingBottom: 95 }}
                placement="right"
              >
                <Form
                  layout="vertical"
                  hideRequiredMark
                  scrollToFirstError
                  onFinish={this.handleSummitCreateNewAccount}
                  ref={this.formRef}
                >
                  <Form.Item {...tailFormItemLayout}>
                    <Form.Item
                      name="username"
                      label={<div style={labelStyle}>Tên đăng nhập</div>}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền tên đăng nhập !",
                        },
                      ]}
                    >
                      <Input style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label={<div style={labelStyle}>Email</div>}
                      rules={[
                        {
                          type: "email",
                          message: "Email không hợp lệ !",
                        },
                        {
                          required: true,
                          message: "Vui lòng điền email !",
                        },
                      ]}
                    >
                      <Input style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label={<div style={labelStyle}>Mật khẩu</div>}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền mật khẩu !",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="confirm"
                      label={<div style={labelStyle}>Nhập lại mật khẩu</div>}
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền lại mật khẩu",
                        },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              "2 mật khẩu không khớp nhau !"
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="firstName"
                      label={
                        <span style={labelStyle}>
                          Họ&nbsp;
                          <Tooltip title="Họ trong tên của bạn">
                            <QuestionCircleOutlined />
                          </Tooltip>
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền họ !",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="lastName"
                      label={
                        <span style={labelStyle}>
                          Tên&nbsp;
                          <Tooltip title="Tên của bạn">
                            <QuestionCircleOutlined />
                          </Tooltip>
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền tên !",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="birthday"
                      label={<div style={labelStyle}>Ngày sinh</div>}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn ngày sinh !",
                        },
                      ]}
                    >
                      <DatePicker />
                    </Form.Item>

                    <Form.Item
                      name="phoneNo"
                      label={<div style={labelStyle}>Số điện thoại</div>}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại !",
                        },
                      ]}
                    >
                      <Input style={({ width: "50%" }, inputStyle)} />
                    </Form.Item>

                    <Form.Item
                      name="address"
                      label={<div style={labelStyle}>Địa chỉ</div>}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền địa chỉ !",
                        },
                      ]}
                    >
                      <Input style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="imageUrl"
                      label={<div style={labelStyle}>Ảnh đại diện</div>}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng tải ảnh đại diện lên !",
                        },
                      ]}
                    >
                      <Input style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="role"
                      label={<div style={labelStyle}>Vai trò</div>}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn vai trò để đăng ký",
                        },
                      ]}
                    >
                      <Radio.Group>
                        <Radio value="TEACHER">Giáo viên</Radio>
                        <Radio value="STUDENT">Học viên</Radio>
                        <Radio value="ADMIN">Admin</Radio>
                      </Radio.Group>
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
                      htmlType="submit"
                      style={{ margin: "10px 10px 30px 30%" }}
                      onClick={this.handleResetForm}
                      htmlType="button"
                    >
                      Đặt lại
                    </Button>
                  </Form.Item>
                </Form>
              </Drawer>
            </div>
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

export default ManageUserAccount;
