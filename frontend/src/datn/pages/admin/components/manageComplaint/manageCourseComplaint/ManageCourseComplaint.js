import React from "react";
import {
  Layout,
  Table,
  message,
  Input,
  Button,
  Space,
  Form,
  Tooltip,
  Popconfirm,
  Modal,
} from "antd";
import TextEditor from "../../richTextEditor/TextEditor";
import Highlighter from "react-highlight-words";
import Parser from "html-react-parser";
import {
  SearchOutlined,
  FileSearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import accountApi from "../../../../../api/AccountApi";
import ComplaintApi from "../../../../../api/ComplaintApi";
import { getAccessToken } from "../../../../../api/TokenUtil";

import "./ManageCourseComplaint.css";

const { Content } = Layout;

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

class ManageComplaint extends React.Component {
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
          title: "Tiêu đề",
          dataIndex: "name",
          key: "name",
          ...this.getColumnSearchProps("name"),
        },
        {
          title: "Loại khiếu nại",
          dataIndex: "typeText",
          key: "typeText",
          ...this.getColumnSearchProps("typeText"),
        },
        {
          title: "Trạng thái",
          dataIndex: "status",
          key: "status",
          ...this.getColumnSearchProps("status"),
        },
        {
          title: "Thời điểm khiếu nại",
          dataIndex: "createdAt",
          key: "createdAt",
        },
        {
          title: "Thời điểm phản hồi",
          dataIndex: "updatedAt",
          key: "updatedAt",
        },
        {
          title: "",
          key: "complaintId",
          render: (text, record) => (
            <Tooltip placement="top" title="Xem chi tiết khiếu nại này">
              <Button onClick={this.handleViewComplaint(record)}>
                <FileSearchOutlined />
              </Button>
            </Tooltip>
          ),
        },
        {
          title: "",
          key: "complaintId",
          render: (text, record) => (
            <Popconfirm
              title="Xác nhận xóa khiếu nại này ?"
              cancelText="Hủy"
              okText="Đồng ý"
              onConfirm={this.handleDeleteComplaint(record.complaintId)}
              disabled={record.isActive === false}
            >
              <Tooltip placement="top" title="Xóa khiếu nại">
                <Button disabled={record.isActive === false}>
                  <DeleteOutlined />
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
      isModalViewVisible: false,
    };
  }

  handleViewComplaint = (complaint) => {
    return async () => {
      console.log("complaint will be viewd  = ", complaint);

      var accessToken = getAccessToken();

      try {
        const response = await accountApi.getById(
          {
            accountId: complaint.fromAccountId,
          },
          accessToken
        );
        console.log("resp = ", response);

        this.setState({
          complaintViewed: complaint,
          fromAccount: response,
          isModalViewVisible: true,
        });
      } catch (e) {
        console.error(e);
        message.error("Lấy chi tiết khiếu nại thất bại", 3);
      }
    };
  };

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

  onCloseModalViewComplaint = () => {
    this.setState({
      isModalViewVisible: false,
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

  getComplaintList = async () => {
    var accessToken = getAccessToken();
    try {
      const getSelfAccountResp = await accountApi.getSelfAccount(accessToken);
      console.log("getSelfAccountResp = ", getSelfAccountResp);

      const response = await ComplaintApi.search(
        {
          type: ["STUDENT_TO_ADMIN", "TEACHER_TO_ADMIN"],
          fieldList: ["type"],
        },
        accessToken
      );
      console.log("res = ", response);
      let dataSourceResponsed = response.map((item, index) => {
        let temp = null;
        let status =
          item.replyContent === null ? "Chưa phản hồi" : "Đã phản hồi";
        if (item.type === "STUDENT_TO_ADMIN") {
          temp = "Gửi đến quản trị viên";
        } else if (item.type === "STUDENT_TO_TEACHER") {
          temp = "Gửi đến giáo viên";
        }
        return {
          ...item,
          typeText: temp,
          status,
          createdAt: item.createdAt.substring(0, item.createdAt.length - 10),
          updatedAt: item.replyContent
            ? item.updatedAt.substring(0, item.updatedAt.length - 10)
            : "",
          index: index + 1,
        };
      });
      this.setState({
        dataSource: dataSourceResponsed,
        selfAccount: getSelfAccountResp,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách khiếu nại thất bại", 3);
    }
  };

  handleSubmitCreateNewComplaint = async (value) => {
    var accessToken = getAccessToken();

    console.log("value form =", value);
    let complaintViewed = this.state.complaintViewed;
    console.log("this.state =", this.state, complaintViewed);
    try {
      const response = await ComplaintApi.update(
        {
          complaintId: complaintViewed.complaintId,
          replyContent: value.replyContent,
          toAccountId: this.state.selfAccount.accountId,
        },
        accessToken
      );
      console.log("resp = ", response);

      message.success("Gửi phản hồi khiếu nại thành công", 3);
      this.setState({
        visible: false,
      });
      this.getComplaintList();
    } catch (e) {
      console.error(e);
      message.error("Gửi phản hồi khiếu nại thất bại", 3);
    }
  };

  handleDeleteComplaint(complaintId) {
    return async () => {
      var accessToken = getAccessToken();

      try {
        const response = await ComplaintApi.archive(
          {
            complaintId,
          },
          accessToken
        );
        console.log("res = ", response);
        this.getComplaintList();
        message.success("Xóa khiếu nại thành công", 3);
      } catch (e) {
        console.error(e);
        message.error("Xóa khiếu nại thất bại", 3);
      }
    };
  }

  handleResetForm = () => {
    this.formRef.current.resetFields();
    this.formRef.current.setFieldsValue({
      replyContent: this.state.complaintViewed.replyContent,
    });
  };

  componentDidMount() {
    this.getComplaintList();
  }

  render() {
    console.log("render manageComplaint");
    console.log("state = ", this.state);

    let complaintViewed = this.state.complaintViewed;
    let fromAccount = this.state.fromAccount;

    return (
      <Layout className="site-layout">
        <Content style={{ overflow: "initial" }}>
          <div className="site-layout-background">
            <div>
              <Modal
                title="Chi tiết khiếu nại"
                width={750}
                okButtonProps={{ disabled: true }}
                cancelText={"Thoát"}
                onCancel={this.onCloseModalViewComplaint}
                visible={this.state.isModalViewVisible}
                placement="right"
              >
                <Form
                  layout="vertical"
                  hideRequiredMark
                  scrollToFirstError
                  onFinish={this.handleSubmitCreateNewComplaint}
                  ref={this.formRef}
                >
                  <Form.Item {...tailFormItemLayout}>
                    {complaintViewed ? (
                      <div>
                        <h2>{complaintViewed.name}</h2>
                        <div style={{ marginTop: "5px", marginBottom: "10px" }}>
                          <div>
                            <h5 style={{ fontWeight: 600 }}>
                              Loại khiếu nại:{" "}
                              {complaintViewed.type === "STUDENT_TO_ADMIN"
                                ? "Học viên gửi đến Admin"
                                : "Giáo viên gửi đến Admin"}
                            </h5>
                          </div>
                          {"Từ: " +
                            fromAccount.firstName +
                            " " +
                            fromAccount.lastName +
                            " (" +
                            fromAccount.email +
                            ")"}
                        </div>

                        <h5 style={{ fontWeight: 600 }}>Nội dung : </h5>
                        {Parser(complaintViewed.content)}
                      </div>
                    ) : null}

                    <Form.Item
                      name="replyContent"
                      label={
                        <h5 style={{ fontWeight: 600 }}>Nội dung phản hồi</h5>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập nội dung phản hồi !",
                        },
                      ]}
                    >
                      <TextEditor />
                    </Form.Item>

                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ margin: "10px 10px 10px 10%" }}
                    >
                      Gửi
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
              </Modal>
            </div>
            <div style={{}}>
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

export default ManageComplaint;
