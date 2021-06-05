import React from "react";
import { BackTop } from "antd";
import { TheContent, TheSidebar, TheHeader } from "./index";

import AuthenticationApi from "../../../api/AuthenticationApi";
import { getAccessToken } from "../../../api/TokenUtil";

import "./TheLayout.css";

const Page404 = React.lazy(() => import("../../page404/Page404"));

class TheAdminLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: null,
    };
  }

  componentDidMount() {
    this.checkRole("TEACHER");
  }

  checkRole = async (role) => {
    console.log("check role TEACHER");
    let value = await this.authenticate(role);
    console.log("value = ", value);
    this.setState({
      isValid:
        value.data !== null && value.data !== undefined ? value.data : value,
    });
  };

  authenticate = async (role) => {
    let accessToken = getAccessToken();
    console.log("access token =", accessToken);
    if (accessToken) {
      console.log("authenticate");
      let isValid = await AuthenticationApi.checkToken({ role }, accessToken);
      return isValid;
    }
    return false;
  };

  render() {
    console.log("render TEACHER LAYOUT");
    console.log("render TEACHER LAYOUT state =", this.state);
    let isValid = this.state.isValid;

    if (isValid === true) {
      return (
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
              <BackTop />
            </div>
            {/* <TheFooter /> */}
          </div>
        </div>
      );
    } else if (isValid === false) {
      return <Page404 />;
    } else {
      return <div></div>;
    }
  }
}

export default TheAdminLayout;
