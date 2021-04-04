import React from "react";
import {
  message,
  Input,
  Button,
  Form,
  Tooltip,
  DatePicker,
  Col,
  Row,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import moment from "moment";

import accountApi from "../../../../api/AccountApi";
import { getAccessToken } from "../../../../api/TokenUtil";

import "./ManageAccount.css";

const inputStyle = {
  fontSize: "16px",
};

const labelStyle = {
  fontSize: "16px",
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

class ManageAccount extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      selfAccount: null,
      username: null,
      email: null,
      firstName: null,
      lastName: null,
      birthday: null,
      phoneNo: null,
      address: null,
      imageUrl: null,
      role: null,
    };
  }

  getSelfAccount = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await accountApi.getSelfAccount(accessToken);
      let {
        username,
        email,
        firstName,
        lastName,
        birthday,
        phoneNo,
        address,
        imageUrl,
        role,
      } = response;
      console.log("res = ", response);
      this.setState({
        selfAccount: response,
        username,
        email,
        firstName,
        lastName,
        birthday,
        phoneNo,
        address,
        imageUrl,
        role,
      });
      this.formRef.current.setFieldsValue({
        username,
        email,
        firstName,
        lastName,
        birthday: moment(birthday),
        phoneNo,
        address,
        imageUrl,
        role,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy thông tin tài khoản cá nhân thất bại", 3);
    }
  };

  handleSubmitUpdateSelfAccountInfo = async (value) => {
    var accessToken = getAccessToken();

    try {
      const response = await accountApi.updateSelfAccount(
        {
          firstName: value.firstName,
          lastName: value.lastName,
          phoneNo: value.phoneNo,
          address: value.address,
          imageUrl: value.imageUrl,
          birthday: value.birthday,
          fieldList: [
            "firstName",
            "lastName",
            "phoneNo",
            "address",
            "imageUrl",
            "birthday",
          ],
        },
        accessToken
      );
      console.log("resp = ", response);
      message.success("Cập nhật thông tin cá nhân thành công", 3);
      this.getSelfAccount();
      this.handleResetForm();
    } catch (e) {
      console.error(e);
      message.error("Cập nhật thông tin cá nhân thất bại", 3);
    }
  };

  handleResetForm = () => {
    this.getSelfAccount();
  };

  componentDidMount() {
    this.getSelfAccount();
  }

  render() {
    console.log("render manageAccount");

    return (
      <Row>
        <Col xs={8} offset={6} style={{ marginTop: "10px" }}>
          <Form
            layout="vertical"
            hideRequiredMark
            scrollToFirstError
            onFinish={this.handleSubmitUpdateSelfAccountInfo}
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
                <Input style={inputStyle} disabled={true} />
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
                <Input style={inputStyle} disabled={true} />
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
                <DatePicker style={inputStyle} size="large" />
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
                <Input style={inputStyle} disabled={true} />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: "10px 10px 10px 10%" }}
              >
                Cập nhật
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
        </Col>
      </Row>
    );
  }
}

export default ManageAccount;
