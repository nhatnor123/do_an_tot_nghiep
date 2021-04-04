import React from "react";
import { message, Input, Button, Form, Col, Row } from "antd";

import accountApi from "../../../../api/AccountApi";
import { getAccessToken } from "../../../../api/TokenUtil";

import "./ChangePassword.css";

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

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  handleSubmitChangePassword = async (value) => {
    var accessToken = getAccessToken();

    try {
      const response = await accountApi.changePassword(
        {
          oldPassword: value.oldPassword,
          newPassword: value.newPassword,
        },
        accessToken
      );
      console.log("resp = ", response);
      message.success("Đổi mật khẩu thành công", 3);
    } catch (e) {
      console.error(e);
      message.error("Đổi mật khẩu thất bại", 3);
      message.error("Mật khẩu cũ không chính xác", 3);
    }
  };

  render() {
    console.log("render changePassword");

    return (
      <Row>
        <Col xs={8} offset={6} style={{ marginTop: "50px" }}>
          <Form
            layout="vertical"
            hideRequiredMark
            scrollToFirstError
            onFinish={this.handleSubmitChangePassword}
            ref={this.formRef}
          >
            <Form.Item {...tailFormItemLayout}>
              <Form.Item
                name="oldPassword"
                label={<div style={labelStyle}>Mật khẩu cũ</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền mật khẩu cũ !",
                  },
                ]}
                hasFeedback
              >
                <Input.Password style={inputStyle} />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label={<div style={labelStyle}>Mật khẩu mới</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền mật khẩu mới !",
                  },
                ]}
                hasFeedback
              >
                <Input.Password style={inputStyle} />
              </Form.Item>

              <Form.Item
                name="confirm"
                label={<div style={labelStyle}>Nhập lại mật khẩu mới</div>}
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền lại mật khẩu mới !",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("2 mật khẩu mới không khớp nhau !");
                    },
                  }),
                ]}
              >
                <Input.Password style={inputStyle} />
              </Form.Item>
              <Row>
                <Col offset="9">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ margin: "10px 10px 10px 10%" }}
                  >
                    Cập nhật
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default ChangePassword;
