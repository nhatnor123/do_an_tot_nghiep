import React from "react";
import {
  Upload,
  Radio,
  Form,
  Input,
  Modal,
  Button,
  message,
  Row,
  Col,
} from "antd";
import CourseGrid from "../courseGrid/CourseGrid";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";

import courseApi from "../../../../api/CourseApi";
import dbFileApi from "../../../../api/DBFileApi";
import { getAccessToken } from "../../../../api/TokenUtil";

import "./ManageCourse.css";

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

class ManageCourse extends React.Component {
  constructor(props) {
    super(props);
    this.formRefCreateNewCourse = React.createRef();
    this.state = {
      isModalCreateNewCourseVisible: false,
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
      courseList: [],
    };
  }

  componentDidMount() {
    this.getCourseList();
  }

  getCourseList = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await courseApi.search(
        {
          courseId: "",
          name: "",
          description: "",
          isPublic: "",
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
      this.setState({
        courseList: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách khóa học của giáo viên thất bại", 3);
    }
  };

  showModalCreateNewCourse = () => {
    this.setState({
      isModalCreateNewCourseVisible: true,
    });
  };

  onCloseModalCreateNewCourse = () => {
    this.setState({
      isModalCreateNewCourseVisible: false,
    });
  };

  handleResetFormCreateNewCourse = () => {
    this.formRefCreateNewCourse.current.resetFields();
  };

  handleCancelPreviewImage = () => this.setState({ previewVisible: false });

  handlePreviewImage = async (file) => {
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

  handleChangeImage = ({ fileList }) => {
    console.log("state after change image : ", this.state);
    this.setState({ fileList });
  };

  handleSummitCreateNewCourse = async (value) => {
    var accessToken = getAccessToken();

    if (!this.state.fileList[0]) {
      message.error("Vui lòng gửi ảnh đại diện lên !");
      return;
    }

    console.log("value =", value);
    try {
      const response = await courseApi.create(
        {
          name: value.name,
          description: value.description,
          isPublic: value.isPublic === "true" ? true : false,
          imageUrl: this.state.fileList[0].response.fileDownloadUri,
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Thêm mới khóa học thành công", 3);
      this.onCloseModalCreateNewCourse();
      this.getCourseList();
      this.handleResetFormCreateNewCourse();
    } catch (e) {
      console.error(e);
      message.error("Thêm mới khóa học thất bại", 3);
    }
  };

  handleSearchCourse = async (value, event) => {
    var accessToken = getAccessToken();
    try {
      const response = await courseApi.search(
        {
          courseId: "",
          name: value,
          description: "",
          isPublic: "",
          isActive: false,
          createdAtFrom: "",
          createdAtTo: "",
          updatedAtFrom: "",
          updatedAtTo: "",
          fieldList: ["name"],
        },
        accessToken
      );
      console.log("res = ", response);
      this.setState({
        courseList: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách khóa học của giáo viên thất bại", 3);
    }
  };

  render() {
    console.log("render manageCourse");
    console.log("state =", this.state);

    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Tải ảnh</div>
      </div>
    );

    return (
      <div>
        <Row>
          <Col span={3}>
            <Button
              type="primary"
              onClick={this.showModalCreateNewCourse}
              style={{ margin: "1% 0px 1% 1%" }}
            >
              <PlusOutlined /> Thêm mới
            </Button>
          </Col>
          <Col offset={1}>
            <Input.Search
              placeholder="Tìm kiếm khóa học"
              onSearch={this.handleSearchCourse}
              enterButton
            />
          </Col>
        </Row>
        <Modal
          title="Thêm mới khóa học"
          width={650}
          okButtonProps={{ disabled: true }}
          cancelText={"Thoát"}
          onCancel={this.onCloseModalCreateNewCourse}
          visible={this.state.isModalCreateNewCourseVisible}
          placement="right"
        >
          <Form
            layout="vertical"
            hideRequiredMark
            scrollToFirstError
            onFinish={this.handleSummitCreateNewCourse}
            ref={this.formRefCreateNewCourse}
          >
            <Form.Item {...tailFormItemLayout}>
              <Form.Item
                name="name"
                label={<div style={labelStyle}>Tên</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền tên khóa học !",
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
                    message: "Vui lòng điền mô tả của khóa học !",
                  },
                ]}
              >
                <Input.TextArea
                  style={inputStyle}
                  autoSize={{ minRows: 5, maxRows: 6 }}
                />
              </Form.Item>

              <Form.Item
                name="imageUrl"
                label={<div style={labelStyle}>Ảnh đại diện khóa học</div>}
              >
                <ImgCrop rotate={true} aspect={1.5}>
                  <Upload
                    action={dbFileApi.uploadFileUrl}
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={beforeUpload}
                    onPreview={this.handlePreviewImage}
                    onChange={this.handleChangeImage}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                </ImgCrop>

                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={this.handleCancelPreviewImage}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </Form.Item>

              <Form.Item
                name="isPublic"
                label={<div style={labelStyle}>Trạng thái</div>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn trạng thái khóa học",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="true">Công khai</Radio>
                  <Radio value="false">Bí mật</Radio>
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
                style={{ margin: "10px 10px 0px 30%" }}
                onClick={this.handleResetFormCreateNewCourse}
                htmlType="button"
              >
                Đặt lại
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div>
          <CourseGrid courseList={this.state.courseList} />
        </div>
      </div>
    );
  }
}

export default ManageCourse;
