import React, { Component } from "react";
import { message } from "antd";
import { getAccessToken } from "../../api/TokenUtil";
import authenticationApi from "../../api/AuthenticationApi";

class AuthBeforeRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: undefined,
    };
  }

  authenticate = async () => {
    let accessToken = getAccessToken();
    if (accessToken) {
      return await authenticationApi.checkToken(
        { role: this.props.role },
        accessToken
      );
    }
    this.props.history.replace("/login");
    return false;
  };

  componentDidMount() {
    this.authenticate()
      .then((res) => {
        this.setState({
          isAuthenticated: res,
        });
        if (!res) {
          message.warn("Vui lòng đăng nhập !", 3);
          this.props.history.push("/login");
        }
      })
      .catch((err) => {
        console.log("err = ");
        console.log(err);
        message.warn("Vui lòng đăng nhập !", 3);
        this.props.history.push("/login");
      });
  }

  render() {
    return this.state.isAuthenticated === undefined ? null : this.state
        .isAuthenticated ? (
      this.props.render()
    ) : (
      <div>
        <h1>401 Unauthorized</h1>
      </div>
    );
  }
}

export default AuthBeforeRender;
