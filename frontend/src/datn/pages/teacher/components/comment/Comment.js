import React from "react";
import {
  message,
  Comment as CommentAntd,
  Avatar,
  Form,
  Button,
  Popconfirm,
} from "antd";
import TextEditor from "../richTextEditor/TextEditor";
import Parser from "html-react-parser";

import accountApi from "../../../../api/AccountApi";
import commentApi from "../../../../api/CommentApi";
import { getAccessToken } from "../../../../api/TokenUtil";
import Modal from "antd/lib/modal/Modal";

import "./Comment.css";

const nestComments = (commentList) => {
  console.log("begin nest comment func =", commentList);
  const commentMap = {};

  // move all the comments into a map of id => comment
  commentList.forEach((comment) => (commentMap[comment.commentId] = comment));
  console.log("comment map =", commentMap);
  // iterate over the comments again and correctly nest the children
  commentList.forEach((comment) => {
    if (comment.commentParentId !== null) {
      const parent = commentMap[comment.commentParentId];
      if (!parent) {
        return;
      }
      (parent.children = parent.children || []).push(comment);
    }
  });

  // filter the list to return a list of correctly nested comments
  let result = commentList.filter((comment) => {
    return comment.commentParentId === null;
  });
  console.log("result of nest comment =", result);
  return result;
};

const getNumberOfComments = (commentsList) => {
  let numberOfComments = 0;
  for (let comment of commentsList) {
    numberOfComments++;
    if (comment.children) {
      numberOfComments =
        numberOfComments + getNumberOfComments(comment.children);
    }
  }
  return numberOfComments;
};

const CommentNestedList = ({
  comment,
  handleClickDeleteButton,
  onOpenModalEditComment,
  onOpenModalReplyComment,
}) => {
  const nestedComments = (comment.children || []).map((comment) => {
    return (
      <CommentNestedList
        comment={comment}
        handleClickDeleteButton={handleClickDeleteButton}
        onOpenModalEditComment={onOpenModalEditComment}
        onOpenModalReplyComment={onOpenModalReplyComment}
      />
    );
  });

  return (
    <CommentAntd
      {...comment}
      author={
        <div style={{ fontSize: "18px", color: "black" }}>{comment.author}</div>
      }
      content={Parser(comment.content)}
      actions={
        comment.isCommentOfSelfAccount
          ? [
              <Button
                type="link"
                style={{ fontSize: "12px" }}
                onClick={() => {
                  return onOpenModalReplyComment(comment.commentId);
                }}
              >
                Phản hồi
              </Button>,
              <Button
                type="link"
                style={{ fontSize: "12px" }}
                onClick={() => {
                  return onOpenModalEditComment(
                    comment.commentId,
                    comment.content
                  );
                }}
              >
                Sửa
              </Button>,
              <Popconfirm
                title="Xác nhận xóa bình luận này ?"
                placement="bottomLeft"
                cancelText="Hủy"
                okText="Đồng ý"
                onConfirm={() => {
                  console.log("handle click =", handleClickDeleteButton);
                  return handleClickDeleteButton(comment.commentId);
                }}
              >
                <Button type="link" style={{ fontSize: "12px" }}>
                  Xóa
                </Button>
                ,
              </Popconfirm>,
            ]
          : [
              <Button
                type="link"
                style={{ fontSize: "12px" }}
                onClick={() => {
                  return onOpenModalReplyComment(comment.commentId);
                }}
              >
                Phản hồi
              </Button>,
            ]
      }
    >
      {nestedComments}
    </CommentAntd>
  );
};

const Editor = ({
  formRefAddNewComment,
  handleResetFormAddNewComment,
  submitting,
  onSubmit,
}) => (
  <>
    <Form
      layout="vertical"
      hideRequiredMark
      scrollToFirstError
      onFinish={onSubmit}
      ref={formRefAddNewComment}
    >
      <Form.Item>
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "Vui lòng điền nội dung bình luận !",
            },
          ]}
          style={{ width: "60%" }}
        >
          <TextEditor />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "10px 10px 10px 0px" }}
          loading={submitting}
        >
          Thêm bình luận
        </Button>
        <Button
          type="primary"
          style={{ margin: "10px 10px 0px 15%" }}
          onClick={handleResetFormAddNewComment}
          htmlType="button"
        >
          Đặt lại
        </Button>
      </Form.Item>
    </Form>
  </>
);

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      selfAccountInfo: null,
      submitting: false,
      value: "",
      isModalEditCommentVisible: false,
      isModalReplyCommentVisible: false,
      currentCommentId: null,
      currentCommentContent: null,
      numbersOfComments: 0,
    };
    this.formRefAddNewComment = React.createRef();
    this.formRefEditComment = React.createRef();
    this.formRefReplyComment = React.createRef();
  }

  componentDidMount() {
    this.getCommentList();
    this.getSelfAccountInfo();
  }

  getCommentList = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await commentApi.search(
        {
          lessonId: this.props.lessonId,
          fieldList: ["lessonId"],
        },
        accessToken
      );
      console.log("response = ", response);
      let temp_1 = response.map((comment) => {
        return {
          accountId: comment.comment.accountId,
          commentId: comment.comment.commentId,
          commentParentId: comment.comment.commentParentId,
          author: comment.otherInfo.name,
          avatar: comment.otherInfo.imageUrl,
          content: comment.comment.content,
          datetime: comment.comment.updatedAt.substring(
            0,
            comment.comment.updatedAt.length - 10
          ),
          isCommentOfSelfAccount:
            comment.comment.accountId === this.state.selfAccountInfo.accountId,
        };
      });
      console.log("temp 1 =", temp_1);
      let temp_2 = nestComments(temp_1);
      console.log("nestComments(temp_1) =", temp_2);
      this.setState({
        comments: temp_2,
        numbersOfComments: getNumberOfComments(temp_2),
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách bình luận thất bại", 3);
    }
  };

  getSelfAccountInfo = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await accountApi.getSelfAccount(accessToken);
      console.log("response = ", response);
      this.setState({
        selfAccountInfo: {
          ...response,
          name:
            response.teacher.displayName.length !== 0
              ? response.teacher.displayName
              : response.firstName + " " + response.lastName,
        },
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy thông tin tài khoản cá nhân thất bại", 3);
    }
  };

  handleSubmit = async (value) => {
    this.setState({
      submitting: true,
    });

    var accessToken = getAccessToken();
    try {
      const response = await commentApi.create(
        {
          commentParentId: null,
          lessonId: this.props.lessonId,
          accountId: this.state.selfAccountInfo.accountId,
          content: value.content,
        },
        accessToken
      );
      console.log("response = ", response);
      message.success("Gửi bình luận thành công", 3);
      this.getCommentList();
      this.handleResetFormAddNewComment();
      this.setState({
        submitting: false,
        value: "",
      });
    } catch (e) {
      console.error(e);
      message.error("Gửi bình luận thất bại", 3);

      this.setState({
        submitting: false,
      });
    }
  };

  handleResetFormAddNewComment = () => {
    this.formRefAddNewComment.current.resetFields();
  };

  handleResetFormEditComment = () => {
    this.formRefEditComment.current.resetFields();
    this.formRefEditComment.current.setFieldsValue({
      content: this.state.currentCommentContent,
    });
  };

  handleResetFormReplyComment = () => {
    this.formRefReplyComment.current.resetFields();
    this.formRefReplyComment.current.setFieldsValue({
      content: "",
    });
  };

  handleClickDeleteButton = async (commentId) => {
    var accessToken = getAccessToken();
    try {
      const response = await commentApi.archive({ commentId }, accessToken);
      console.log("response = ", response);
      this.getCommentList();
      message.success("Xóa bình luận thành công", 3);
    } catch (e) {
      console.error(e);
      message.error("Xóa bình luận thất bại", 3);
    }
  };

  onOpenModalEditComment = (commentId, content) => {
    this.setState({
      isModalEditCommentVisible: true,
      currentCommentId: commentId,
      currentCommentContent: content,
    });
  };

  onOpenModalReplyComment = (commentId) => {
    this.setState({
      isModalReplyCommentVisible: true,
      currentCommentId: commentId,
    });
  };

  onCloseModalEditComment = () => {
    this.setState({
      isModalEditCommentVisible: false,
      currentCommentId: null,
      currentCommentContent: null,
    });
  };

  onCloseModalReplyComment = () => {
    this.setState({
      isModalReplyCommentVisible: false,
      currentCommentId: null,
      currentCommentContent: null,
    });
  };

  onSubmitEditComment = async (value) => {
    var accessToken = getAccessToken();
    try {
      const response = await commentApi.update(
        { commentId: this.state.currentCommentId, content: value.content },
        accessToken
      );
      console.log("response = ", response);
      message.success("Sửa bình luận thành công", 3);
      this.getCommentList();
      this.onCloseModalEditComment();
      this.handleResetFormEditComment();
    } catch (e) {
      console.error(e);
      message.error("Sửa bình luận thất bại", 3);
    }
  };

  onSubmitReplyComment = async (value) => {
    var accessToken = getAccessToken();
    try {
      const response = await commentApi.create(
        {
          commentParentId: this.state.currentCommentId,
          lessonId: this.props.lessonId,
          accountId: this.state.selfAccountInfo.accountId,
          content: value.content,
        },
        accessToken
      );
      console.log("response = ", response);
      message.success("Thêm bình luận thành công", 3);
      this.getCommentList();
      this.onCloseModalReplyComment();
      this.handleResetFormReplyComment();
    } catch (e) {
      console.error(e);
      message.error("Thêm bình luận thành công", 3);
    }
  };

  render() {
    console.log("state =", this.state);
    const { comments } = this.state;

    return this.state.selfAccountInfo ? (
      <div
        style={{ marginTop: "40px", fontSize: "16px", marginBottom: "150px" }}
      >
        <Modal
          title="Sửa bình luận"
          width={650}
          okButtonProps={{ disabled: true }}
          cancelText={"Thoát"}
          onCancel={this.onCloseModalEditComment}
          visible={this.state.isModalEditCommentVisible}
          placement="right"
        >
          <Form
            layout="vertical"
            hideRequiredMark
            scrollToFirstError
            onFinish={this.onSubmitEditComment}
            ref={this.formRefEditComment}
          >
            <Form.Item>
              <Form.Item
                name="content"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền nội dung bình luận !",
                  },
                ]}
              >
                <TextEditor />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: "10px 10px 10px 0px" }}
              >
                Cập nhật
              </Button>
              <Button
                type="primary"
                style={{ margin: "10px 10px 0px 15%" }}
                onClick={this.handleResetFormEditComment}
                htmlType="button"
              >
                Đặt lại
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Phản hồi bình luận"
          width={650}
          okButtonProps={{ disabled: true }}
          cancelText={"Thoát"}
          onCancel={this.onCloseModalReplyComment}
          visible={this.state.isModalReplyCommentVisible}
          placement="right"
        >
          <Form
            layout="vertical"
            hideRequiredMark
            scrollToFirstError
            onFinish={this.onSubmitReplyComment}
            ref={this.formRefReplyComment}
          >
            <Form.Item>
              <Form.Item
                name="content"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền nội dung bình luận !",
                  },
                ]}
              >
                <TextEditor />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: "10px 10px 10px 0px" }}
              >
                Thêm
              </Button>
              <Button
                type="primary"
                style={{ margin: "10px 10px 0px 15%" }}
                onClick={this.handleResetFormReplyComment}
                htmlType="button"
              >
                Đặt lại
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <h3 style={{ fontWeight: "bold" }}>
          Bình luận ({this.state.numbersOfComments})
        </h3>
        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <CommentNestedList
                comment={comment}
                handleClickDeleteButton={this.handleClickDeleteButton}
                onOpenModalEditComment={this.onOpenModalEditComment}
                onOpenModalReplyComment={this.onOpenModalReplyComment}
              />
            );
          })}
        <CommentAntd
          avatar={
            <Avatar
              src={this.state.selfAccountInfo.imageUrl}
              alt="this.state.selfAccountInfo.name"
            />
          }
          content={
            <Editor
              formRefAddNewComment={this.formRefAddNewComment}
              handleResetFormAddNewComment={this.handleResetFormAddNewComment}
              submitting={this.state.submitting}
              onSubmit={this.handleSubmit}
            />
          }
        />
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default Comment;
