import React from "react";
import { TheContent, TheSidebar, TheHeader } from "./index";

import AuthenticationApi from "../../../api/AuthenticationApi";
import { getAccessToken } from "../../../api/TokenUtil";

const Page404 = React.lazy(() => import("../../page404/Page404"));

class TheAdminLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: null,
    };
  }

  componentDidMount() {
    this.checkRole("ADMIN");
  }

  checkRole = async (role) => {
    console.log("check role admin");
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
    console.log("render ADMIN LAYOUT");
    console.log("render ADMIN LAYOUT state =", this.state);
    let isValid = this.state.isValid;

    if (isValid === true) {
      return (
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader props_1={this.props} />
            <div className="c-body">
              <TheContent />
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
