import React from "react";
import {
  message,
  Comment as CommentAntd,
  Avatar,
  Form,
  Button,
  List,
  Input,
} from "antd";
import moment from "moment";

import accountApi from "../../../../api/AccountApi";
import commentApi from "../../../../api/CommentApi";
import { getAccessToken } from "../../../../api/TokenUtil";

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} bình luận`}
    itemLayout="horizontal"
    renderItem={(props) => <CommentAntd {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <Input.TextArea
        rows={4}
        onChange={onChange}
        value={value}
        style={{ width: "50%" }}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Thêm bình luận
      </Button>
    </Form.Item>
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
    };
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
      this.setState({
        comments: response.map((comment) => {
          return {
            author: comment.otherInfo.name,
            avatar: comment.otherInfo.imageUrl,
            content: comment.comment.content,
            datetime: comment.comment.updatedAt.substring(
              0,
              comment.comment.updatedAt.length - 10
            ),
          };
        }),
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

  handleSubmit = async () => {
    if (!this.state.value) {
      return;
    }

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
          content: this.state.value,
        },
        accessToken
      );
      console.log("response = ", response);
      this.getCommentList();

      this.setState({
        submitting: false,
        value: "",
        // comments: [
        //   ...this.state.comments,
        //   {
        //     author: this.state.selfAccountInfo.name,
        //     avatar: this.state.selfAccountInfo.imageUrl,
        //     content: <p>{this.state.value}</p>,
        //     datetime: moment().fromNow(),
        //   },
        // ],
      });
    } catch (e) {
      console.error(e);
      message.error("Gửi bình luận thất bại", 3);

      this.setState({
        submitting: false,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    console.log("state =", this.state);
    const { comments, submitting, value } = this.state;

    return this.state.selfAccountInfo ? (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <CommentAntd
          avatar={
            <Avatar
              src={this.state.selfAccountInfo.imageUrl}
              alt="this.state.selfAccountInfo.name"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
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
