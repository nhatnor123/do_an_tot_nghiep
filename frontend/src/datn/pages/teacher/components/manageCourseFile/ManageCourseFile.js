import React from "react";
import {
  Form,
  Input,
  Modal,
  Button,
  message,
  Row,
  Col,
  List,
  Upload,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import CourseFileApi from "../../../../api/CourseFileApi";
import DBFileApi from "../../../../api/DBFileApi";
import { getAccessToken } from "../../../../api/TokenUtil";

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

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Dung lượng ảnh phải bé hơn 2MB !");
  }
  return isLt2M;
}

class ManageCourseFile extends React.Component {
  constructor(props) {
    super(props);
    this.formRefCreateNewCourseFile = React.createRef();
    this.formRefUpdateCourseFile = React.createRef();
    this.state = {
      isModalCreateNewCourseFileVisible: false,
      isModalUpdateCourseFileVisible: false,
      courseFileList: [],
      fileList: [],
    };
  }

  componentDidMount() {
    this.getCourseFileList();
  }

  getCourseFileList = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await CourseFileApi.search(
        {
          courseId: this.props.courseId,
          fieldList: ["courseId"],
        },
        accessToken
      );
      console.log("res = ", response);
      this.setState({
        courseFileList: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách tài liệu khóa học thất bại", 3);
    }
  };

  showModalCreateNewCourseFile = () => {
    this.setState({
      isModalCreateNewCourseFileVisible: true,
    });
  };

  showModalUpdate = (courseFile) => {
    setTimeout(() => {
      this.handleResetFormUpdateCourse();
    }, 3000);
    return () => {
      this.setState({
        isModalUpdateCourseFileVisible: true,
        courseFile: courseFile,
        fileList: [
          {
            uid: "-1",
            name: courseFile.name,
            status: "done",
            url: courseFile.link,
            response: { fileDownloadUri: courseFile.link },
          },
        ],
      });
    };
  };

  onCloseModalCreateNewCourseFile = () => {
    this.setState({
      isModalCreateNewCourseFileVisible: false,
    });
  };

  onCloseModalUpdateCourseFile = () => {
    this.setState({
      isModalUpdateCourseFileVisible: false,
    });
  };

  handleResetFormCreateNewCourseFile = () => {
    this.formRefCreateNewCourseFile.current.resetFields();
  };

  handleResetFormUpdateCourse = () => {
    let courseFile = this.state.courseFile;
    this.formRefUpdateCourseFile.current.resetFields();
    this.formRefUpdateCourseFile.current.setFieldsValue({
      name: courseFile.name,
      description: courseFile.description,
    });
  };

  handleSubmitCreateNewCourseFile = async (value) => {
    var accessToken = getAccessToken();

    console.log("value =", value);

    if (!this.state.fileList[0]) {
      message.error("Vui lòng upload tài liệu lên !");
      return;
    }

    try {
      const response = await CourseFileApi.create(
        {
          courseId: this.props.courseId,
          name: value.name,
          description: value.description,
          link: this.state.fileList[0].response.fileDownloadUri,
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Thêm mới tài liệu khóa học thành công", 3);
      this.onCloseModalCreateNewCourseFile();
      this.getCourseFileList();
      this.handleResetFormCreateNewCourseFile();
    } catch (e) {
      console.error(e);
      message.error("Thêm mới tài liệu khóa học thất bại", 3);
    }
  };

  handleSubmitUpdateCourseFile = async (value) => {
    var accessToken = getAccessToken();

    console.log("value =", value);

    if (!this.state.fileList[0]) {
      message.error("Vui lòng upload tài liệu lên !");
      return;
    }

    try {
      const response = await CourseFileApi.update(
        {
          courseFileId: this.state.courseFile.courseFileId,
          name: value.name,
          description: value.description,
          link: this.state.fileList[0].response.fileDownloadUri,
          fieldList: ["link", "name", "description"],
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Sửa tài liệu khóa học thành công", 3);
      this.onCloseModalUpdateCourseFile();
      this.getCourseFileList();
      this.handleResetFormUpdateCourse();
    } catch (e) {
      console.error(e);
      message.error("Sửa tài liệu khóa học thất bại", 3);
    }
  };

  handleSearchCourseFile = async (value, event) => {
    var accessToken = getAccessToken();
    try {
      const response = await CourseFileApi.search(
        {
          courseId: this.props.courseId,
          name: value,
          fieldList: ["courseId", "name"],
        },
        accessToken
      );
      console.log("res = ", response);
      this.setState({
        courseFileList: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách tài liệu khóa học thất bại", 3);
    }
  };

  handleChangeFile = ({ fileList }) => {
    this.setState({ fileList });
  };

  handleClickDeleteButton = (courseFileId) => {
    return async () => {
      var accessToken = getAccessToken();

      try {
        const response = await CourseFileApi.archive(
          {
            courseFileId: courseFileId,
          },
          accessToken
        );
        console.log("resp = ", response);
        message.success("Xóa tài liệu thành công", 3);
        this.getCourseFileList();
      } catch (e) {
        console.error(e);
        message.error("Xóa tài liệu thất bại", 3);
      }
    };
  };

  render() {
    console.log("state =", this.state);

    return (
      <div>
        <Row style={{ marginTop: "10px" }}>
          <Col span={5}>
            <Button
              type="primary"
              onClick={this.showModalCreateNewCourseFile}
              style={{ margin: "1% 0px 1% 1%" }}
            >
              <PlusOutlined /> Thêm mới
            </Button>
          </Col>
          <Col offset={9}>
            <Input.Search
              placeholder="Tìm kiếm tài liệu"
              onSearch={this.handleSearchCourseFile}
              enterButton
            />
          </Col>
        </Row>

        <Modal
          title="Thêm mới tài liệu khóa học"
          width={650}
          okButtonProps={{ disabled: true }}
          cancelText={"Thoát"}
          onCancel={this.onCloseModalCreateNewCourseFile}
          visible={this.state.isModalCreateNewCourseFileVisible}
          placement="right"
        >
          <Form
            layout="vertical"
            hideRequiredMark
            scrollToFirstError
            onFinish={this.handleSubmitCreateNewCourseFile}
            ref={this.formRefCreateNewCourseFile}
          >
            <Form.Item {...tailFormItemLayout}>
              <Form.Item
                name="name"
                label={<div style={labelStyle}>Tên</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền tên tài liệu !",
                  },
                ]}
              >
                <Input style={inputStyle} />
              </Form.Item>

              <Form.Item
                name="description"
                label={<div style={labelStyle}>Mô tả</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền mô tả của tài liệu !",
                  },
                ]}
              >
                <Input.TextArea
                  style={inputStyle}
                  autoSize={{ minRows: 5, maxRows: 6 }}
                />
              </Form.Item>

              <Form.Item
                name="fileUrl"
                label={<div style={labelStyle}>Upload tài liệu</div>}
              >
                <Upload
                  action={DBFileApi.uploadFileUrl}
                  fileList={this.state.fileList}
                  beforeUpload={beforeUpload}
                  onChange={this.handleChangeFile}
                >
                  {this.state.fileList.length >= 1 ? null : (
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  )}
                </Upload>
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
                style={{ margin: "10px 10px 0px 30%" }}
                onClick={this.handleResetFormCreateNewCourseFile}
                htmlType="button"
              >
                Đặt lại
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Sửa tài liệu khóa học"
          width={650}
          okButtonProps={{ disabled: true }}
          cancelText={"Thoát"}
          onCancel={this.onCloseModalUpdateCourseFile}
          visible={this.state.isModalUpdateCourseFileVisible}
          placement="right"
        >
          <Form
            layout="vertical"
            hideRequiredMark
            scrollToFirstError
            onFinish={this.handleSubmitUpdateCourseFile}
            ref={this.formRefUpdateCourseFile}
          >
            <Form.Item {...tailFormItemLayout}>
              <Form.Item
                name="name"
                label={<div style={labelStyle}>Tên</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền tên tài liệu !",
                  },
                ]}
              >
                <Input style={inputStyle} />
              </Form.Item>

              <Form.Item
                name="description"
                label={<div style={labelStyle}>Mô tả</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền mô tả của tài liệu !",
                  },
                ]}
              >
                <Input.TextArea
                  style={inputStyle}
                  autoSize={{ minRows: 5, maxRows: 6 }}
                />
              </Form.Item>

              <Form.Item
                name="fileUrl"
                label={<div style={labelStyle}>Upload tài liệu</div>}
              >
                <Upload
                  action={DBFileApi.uploadFileUrl}
                  fileList={this.state.fileList}
                  beforeUpload={beforeUpload}
                  onChange={this.handleChangeFile}
                >
                  {this.state.fileList.length >= 1 ? null : (
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  )}
                </Upload>
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
                style={{ margin: "10px 10px 0px 30%" }}
                onClick={this.handleResetFormUpdateCourse}
                htmlType="button"
              >
                Đặt lại
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div>
          <List
            itemLayout="horizontal"
            style={{ marginTop: "20px", marginBottom: "30px" }}
            dataSource={this.state.courseFileList}
            bordered={true}
            renderItem={(courseFile) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a
                      href={courseFile.link}
                      style={{
                        textDecoration: "none",
                        fontWeight: "600",
                        marginBottom: "12px",
                        marginTop: "10px",
                        color: "#1890ff !important",
                        fontSize: "20px",
                      }}
                      className="link-to-the-lesson"
                    >
                      {courseFile.name}
                    </a>
                  }
                  description={
                    <div
                      style={{
                        paddingBottom: "23px",
                        // borderStyle: "groove",
                        // borderWidth: "0 0 0.5px 0",
                      }}
                    >
                      {courseFile.description}
                      <Button></Button>
                    </div>
                  }
                />
                <Row style={{ marginTop: "10px" }}>
                  <Col span={5}>
                    <Button
                      type="primary"
                      onClick={this.showModalUpdate(courseFile)}
                      style={{ margin: "1% 0px 1% 1%" }}
                    >
                      <EditOutlined /> Sửa
                    </Button>
                    <Popconfirm
                      title="Xác nhận xóa tài liệu này ?"
                      cancelText="Hủy"
                      okText="Đồng ý"
                      onConfirm={this.handleClickDeleteButton(
                        courseFile.courseFileId
                      )}
                    >
                      <Button
                        type="primary"
                        style={{ margin: "1% 0px 1% 20px" }}
                      >
                        <DeleteOutlined /> Xóa
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default ManageCourseFile;
