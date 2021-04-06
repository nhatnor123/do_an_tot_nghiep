import React from "react";
import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react";

import {
  Form,
  Input,
  Tooltip,
  Row,
  Col,
  Checkbox,
  Button,
  DatePicker,
  Radio,
  message,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import accountApi from "../../api/AccountApi";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const inputStyle = {
  fontSize: "16px",
};

const labelStyle = {
  fontSize: "14px",
};

const Register = (props) => {
  const handleSummit = async (value) => {
    try {
      const response = await accountApi.register({
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
      });
      console.log("resp = ", response);

      message.success("Đăng ký thành công", 3);
      props.history.push("/login");
    } catch (e) {
      console.error(e);
      message.error("Đăng ký thất bại", 3);
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="10" lg="8" xl="7">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <Form
                  {...formItemLayout}
                  name="register"
                  scrollToFirstError
                  onFinish={handleSummit}
                >
                  <h1>Đăng ký</h1>
                  <Form.Item
                    name="username"
                    label={<div style={labelStyle}>Tên đăng nhập</div>}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng điền tên đăng nhập !",
                      },
                      {
                        pattern: new RegExp(
                          "^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
                        ),
                        message: "Sai định dạng tên đăng nhập",
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
                          return Promise.reject("2 mật khẩu không khớp nhau !");
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
                      {
                        pattern: new RegExp(
                          "^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$"
                        ),
                        message: "Sai định dạng số điện thoại",
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
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject("Bắt buộc phải đồng ý"),
                      },
                    ]}
                    {...tailFormItemLayout}
                  >
                    <Checkbox>
                      Tôi đồng ý với <a href="#">điều khoản của hệ thống</a>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <Row style={{ marginTop: "5px" }}>
                      <Col md={4} xs={8}></Col>
                      <Col md={5} xs={16}>
                        <Button type="primary" htmlType="submit">
                          Đăng ký
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
