import React from "react";
import { message, Avatar, Image } from "antd";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import accountApi from "../../../api/AccountApi";
import { getAccessToken, removeToken } from "../../../api/TokenUtil";

class TheHeaderDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
    };
  }

  componentDidMount() {
    this.getSelfAccountInfo();
  }

  handleClickButtonLogOut = () => {
    removeToken();
    this.props.props_2.props_1.history.push("/login");
  };

  getSelfAccountInfo = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await accountApi.getSelfAccount(accessToken);
      console.log("response = ", response);
      this.setState({
        imageUrl: response.imageUrl,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy thông tin tài khoản cá nhân thất bại", 3);
    }
  };

  render() {
    return (
      <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <Avatar
              src={
                <Image
                  src={this.state.imageUrl}
                  preview={false}
                  alt={"Avatar"}
                />
              }
            />
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem header tag="div" color="light" className="text-center">
            <strong>Account</strong>
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-bell" className="mfe-2" />
            Updates
            <CBadge color="info" className="mfs-auto">
              0
            </CBadge>
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-envelope-open" className="mfe-2" />
            Messages
            <CBadge color="success" className="mfs-auto">
              0
            </CBadge>
          </CDropdownItem>
          <CDropdownItem header tag="div" color="light" className="text-center">
            <strong>Settings</strong>
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-user" className="mfe-2" />
            Profile
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-settings" className="mfe-2" />
            Settings
          </CDropdownItem>
          <CDropdownItem divider />
          <CDropdownItem onClick={this.handleClickButtonLogOut}>
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Đăng xuất
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    );
  }
}

export default TheHeaderDropdown;
