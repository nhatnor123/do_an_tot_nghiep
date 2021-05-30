import React from "react";
import {
  message,
  Tag,
  Form,
  Modal,
  Button,
  Radio,
  Row,
  Col,
  Input,
  Upload,
  Popconfirm,
} from "antd";
import ImgCrop from "antd-img-crop";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import courseApi from "../../../../api/CourseApi";
import dbFileApi from "../../../../api/DBFileApi";
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

message.config({
  top: 80,
});

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

class CourseOverview extends React.Component {
  constructor(props) {
    super(props);
    this.formRefUpdateCourse = React.createRef();
    this.state = {
      courseId: props.courseId,
      isModalUpdateCourseVisible: false,
      isModalCourseCodeVisible: false,
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
    };
  }

  componentDidMount() {
    console.log("State = ", this.state);
    this.getCourseDetail();
  }

  getCourseDetail = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await courseApi.getById(
        {
          courseId: this.state.courseId,
        },
        accessToken
      );
      console.log("res = ", response);
      this.setState({
        courseDetail: response,
        fileList: [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: response.imageUrl,
            response: { fileDownloadUri: response.imageUrl },
          },
        ],
        courseCode: response.code,
      });
    } catch (e) {
      console.error(e);
      message.error(
        "Lấy thông tin chi tiết khóa học của giáo viên thất bại",
        3
      );
    }
  };

  showModalUpdateCourse = () => {
    this.setState({
      isModalUpdateCourseVisible: true,
    });
  };

  onCloseModalUpdateCourse = () => {
    this.setState({
      isModalUpdateCourseVisible: false,
    });
  };

  showModalCourseCode = () => {
    this.setState({
      isModalCourseCodeVisible: true,
    });
  };

  onCloseModalCourseCode = () => {
    this.setState({
      isModalCourseCodeVisible: false,
    });
  };

  handleResetFormUpdateCourse = () => {
    this.formRefUpdateCourse.current.resetFields();
    let courseDetail = this.state.courseDetail;
    this.formRefUpdateCourse.current.setFieldsValue({
      name: courseDetail.name,
      description: courseDetail.description,
      isPublic: courseDetail.isPublic === true ? "isPublic" : "isNotPublic",
    });
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

  handleSummitUpdateCourse = async (value) => {
    var accessToken = getAccessToken();

    if (!this.state.fileList[0]) {
      message.error("Vui lòng gửi ảnh đại diện lên !");
      return;
    }

    try {
      const response = await courseApi.updateCourseInfo(
        {
          courseId: this.state.courseId,
          name: value.name,
          description: value.description,
          isPublic: value.isPublic === "isPublic" ? true : false,
          imageUrl: this.state.fileList[0].response.fileDownloadUri,
          fieldList: ["name", "description", "isPublic", "imageUrl"],
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Cập nhật thông tin khóa học thành công", 3);
      this.onCloseModalUpdateCourse();
      this.getCourseDetail();
      this.handleResetFormUpdateCourse();
    } catch (e) {
      console.error(e);
      message.error("Cập nhật thông tin khóa học thất bại", 3);
    }
  };

  handleClickDeleteButton = async () => {
    var accessToken = getAccessToken();

    try {
      const response = await courseApi.archive(
        {
          courseId: this.state.courseId,
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Xóa khóa học thành công", 3);
      this.props.history.push("/teacher/manageCourse");
    } catch (e) {
      console.error(e);
      message.error("Xóa khóa học thất bại", 3);
    }
  };

  handleClickChangeCourseCodeButton = async (value) => {
    var accessToken = getAccessToken();

    try {
      const response = await courseApi.updateCourseInfo(
        {
          courseId: this.state.courseId,
          name: "",
          description: "",
          isPublic: true,
          imageUrl: "",
          fieldList: ["code"],
        },
        accessToken
      );
      console.log("resp = ", response);
      this.setState({
        courseCode: response.code,
      });
      message.success("Đổi mã khóa học thành công", 3);
    } catch (e) {
      console.error(e);
      message.error("Cập nhật thông tin khóa học thất bại", 3);
    }
  };

  render() {
    let courseDetail = this.state.courseDetail ? this.state.courseDetail : null;

    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Tải ảnh</div>
      </div>
    );

    return courseDetail ? (
      <div>
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Col span={3}>
            <Button
              type="primary"
              onClick={this.showModalCourseCode}
              style={{ margin: "1% 0px 1% 1%" }}
            >
              <KeyOutlined /> Code khóa học
            </Button>
          </Col>
          <Col span={5}>
            <Button
              type="primary"
              onClick={this.showModalUpdateCourse}
              style={{ margin: "1% 0px 1% 1%" }}
            >
              <EditOutlined /> Sửa
            </Button>
            <Popconfirm
              title="Xác nhận xóa khóa học này ?"
              cancelText="Hủy"
              okText="Đồng ý"
              onConfirm={this.handleClickDeleteButton}
            >
              <Button type="primary" style={{ margin: "1% 0px 1% 20px" }}>
                <DeleteOutlined /> Xóa
              </Button>
            </Popconfirm>
          </Col>
        </Row>
        <Modal
          title="Mã Code khóa học"
          width={650}
          okButtonProps={{ disabled: true }}
          cancelText={"Thoát"}
          onCancel={this.onCloseModalCourseCode}
          visible={this.state.isModalCourseCodeVisible}
          placement="right"
        >
          <div
            style={{
              fontSize: "20px",
              marginBottom: "20px",
            }}
          >
            {this.state.courseCode}
          </div>
          <Button
            type="primary"
            onClick={this.handleClickChangeCourseCodeButton}
          >
            <RedoOutlined />
            Đổi mã Code
          </Button>
        </Modal>
        <Modal
          title="Sửa khóa học"
          width={650}
          okButtonProps={{ disabled: true }}
          cancelText={"Thoát"}
          onCancel={this.onCloseModalUpdateCourse}
          visible={this.state.isModalUpdateCourseVisible}
          placement="right"
        >
          <Form
            layout="vertical"
            hideRequiredMark
            scrollToFirstError
            onFinish={this.handleSummitUpdateCourse}
            ref={this.formRefUpdateCourse}
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
                  <Radio value="isPublic">Công khai</Radio>
                  <Radio value="isNotPublic">Bí mật</Radio>
                </Radio.Group>
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
        <Row style={{ marginTop: "10px" }}>
          <Col span={18} offset={2}>
            <img
              src={courseDetail.imageUrl}
              alt={courseDetail.name}
              style={{ width: "70%", height: "auto", margin: "auto" }}
            />
            <div style={{ marginLeft: "15px" }}>
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "12px",
                  marginTop: "17px",
                  color: "#076ac8 !important",
                  fontSize: "28px",
                }}
              >
                {courseDetail.name}
              </div>
              <div
                style={{
                  marginTop: "15px",
                  marginBottom: "30px",
                  fontSize: "18px",
                }}
              >
                {courseDetail.isPublic === true ? (
                  <Tag color="#55acee" style={{ fontSize: "15px" }}>
                    Công khai
                  </Tag>
                ) : (
                  <Tag color="#00a76a" style={{ fontSize: "15px" }}>
                    Không Công khai
                  </Tag>
                )}
              </div>
              <div
                style={{
                  color: "#969696",
                  fontSize: "17px",
                  marginBottom: "150px",
                }}
              >
                {courseDetail.description}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default CourseOverview;
