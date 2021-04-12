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
  Upload,
  Modal,
} from "antd";
import { QuestionCircleOutlined, PlusOutlined } from "@ant-design/icons";

import moment from "moment";

import accountApi from "../../../../api/AccountApi";
import dbFileApi from "../../../../api/DBFileApi";
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

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Chỉ có thể upload được ảnh có định dạng JPG/PNG !");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Dung lượng ảnh phải bé hơn 2MB !");
  }
  return isJpgOrPng && isLt2M;
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

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
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }) => {
    console.log("state after change image : ", this.state);
    this.setState({ fileList });
  };

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
        fileList: [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: imageUrl,
            response: { fileDownloadUri: imageUrl },
          },
        ],
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

    if (!this.state.fileList[0]) {
      message.error("Vui lòng gửi ảnh đại diện lên !");
      return;
    }

    try {
      const response = await accountApi.updateSelfAccount(
        {
          firstName: value.firstName,
          lastName: value.lastName,
          phoneNo: value.phoneNo,
          address: value.address,
          imageUrl: this.state.fileList[0].response.fileDownloadUri,
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

    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Tải ảnh</div>
      </div>
    );

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
              >
                <Upload
                  action={dbFileApi.uploadFileUrl}
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
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
