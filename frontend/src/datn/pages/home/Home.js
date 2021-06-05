import React from "react";
import jwtDecode from "jwt-decode";

import { getAccessToken } from "../../api/TokenUtil";

export default class Home extends React.Component {
  componentDidMount() {
    let accessToken = getAccessToken();
    console.log("access token =", accessToken);

    if (accessToken === undefined) {
      this.props.history.push("/login");
      return;
    }

    let tokenContent = jwtDecode(accessToken);
    console.log("tokenContent = ", tokenContent);
    console.log(
      "tokenContent.role[0].authority = ",
      tokenContent.role[0].authority
    );

    switch (tokenContent.role[0].authority) {
      case "ROLE_TEACHER":
        this.props.history.push("/teacher");
        break;
      case "ROLE_STUDENT":
        this.props.history.push("/student");
        break;
      case "ROLE_ADMIN":
        this.props.history.push("/admin");
        break;
      default:
        this.props.history.push("/login");
    }
  }

  render() {
    return <div></div>;
  }
}
