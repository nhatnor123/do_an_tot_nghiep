import React from "react";
import {
  message,
  Tag,
  Tabs,
  Form,
  Modal,
  Button,
  Radio,
  Row,
  Col,
  Input,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import courseApi from "../../../../api/CourseApi";
import dbFileApi from "../../../../api/DBFileApi";
import { getAccessToken } from "../../../../api/TokenUtil";

const { TabPane } = Tabs;

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

class CourseOverview extends React.Component {
  constructor(props) {
    super(props);
    this.formRefUpdateCourse = React.createRef();
    this.state = {
      courseId: props.courseId,
      isModalUpdateCourseVisible: false,
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
      });
      console.log("this =", this);
      this.formRefUpdateCourse.current.setFieldsValue({
        name: response.name,
        description: response.description,
        isPublic: response.isPublic,
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

  handleResetFormUpdateCourse = () => {
    this.formRefUpdateCourse.current.resetFields();
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

  render() {
    let courseDetail = this.state.courseDetail ? this.state.courseDetail : null;

    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Tải ảnh</div>
      </div>
    );

    return this.state.courseDetail ? (
      <div>
        <Row>
          <Col span={5}>
            <Button
              type="primary"
              onClick={this.showModalUpdateCourse}
              style={{ margin: "1% 0px 1% 1%" }}
            >
              <PlusOutlined /> Sửa
            </Button>
          </Col>
        </Row>
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
                Thêm mới
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
        <img src={courseDetail.imageUrl} alt={courseDetail.name} />
        <div style={{ marginLeft: "15px" }}>
          <div>
            <h3
              style={{
                fontWeight: "600",
                marginBottom: "12px",
                marginTop: "10px",
                color: "#076ac8",
              }}
            >
              {courseDetail.name}
            </h3>
          </div>
          <div>{courseDetail.description}</div>
          <div>
            {courseDetail.isPublic === true ? (
              <Tag color="#55acee">Công khai</Tag>
            ) : (
              <Tag color="#00a76a">Không Công khai</Tag>
            )}
          </div>
        </div>
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default CourseOverview;
