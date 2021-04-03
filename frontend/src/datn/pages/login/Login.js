import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSelect,
  CInvalidFeedback,
  CValidFeedback,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { message } from "antd";

import authenticationApi from "../../../datn/api/AuthenticationApi";
import { setAccessToken } from "../../../datn/api/TokenUtil";

const Login = (props) => {
  let [username, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("TEACHER");

  const handleSubmitForm = async () => {
    let isValidated = true;
    if (!username || username === "") {
      message.error("Vui lòng nhập tên đăng nhập", 1);
      isValidated = false;
    }
    if (!password || password === "") {
      message.error("Vui lòng nhập mật khẩu", 1);
      isValidated = false;
    }
    if (!role) {
      message.error("Vui lòng chọn vai trò đăng nhập", 1);
      isValidated = false;
    }
    if (!isValidated) {
      return;
    }

    try {
      const response = await authenticationApi.getToken({
        username,
        password,
        role,
      });
      setAccessToken(response.token);
      message.success("Đăng nhập thành công", 3);
      console.log("path will route = ", `/${role.toLowerCase()}`);
      props.history.push(`/${role.toLowerCase()}`);
    } catch (e) {
      console.error(e);
      message.error("Đăng nhập thất bại", 3);
      message.error("Sai tên đăng nhập hoặc mật khẩu", 3);
    }
  };

  const handleChangeUsername = (event) => {
    setUserName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Đăng nhập</h1>
                    <p className="text-muted">
                      Đăng nhập bằng tài khoản của bạn
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        className="form-control-warning"
                        type="text"
                        placeholder="Tên đăng nhập"
                        autoComplete="username"
                        value={username}
                        onChange={handleChangeUsername}
                        required
                      />
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">
                        Input provided
                      </CValidFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Mật khẩu"
                        autoComplete="current-password"
                        value={password}
                        onChange={handleChangePassword}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cilSettings" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CCol>
                        <CSelect
                          custom
                          name="role"
                          id="select"
                          value={role}
                          onChange={handleChangeRole}
                        >
                          <option value="TEACHER">Giáo viên</option>
                          <option value="STUDENT">Học viên</option>
                          <option value="ADMIN">Admin</option>
                        </CSelect>
                      </CCol>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleSubmitForm}
                        >
                          Đăng nhập
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Quên mật khẩu ?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-success py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Đăng ký</h2>
                    <p>Chưa có tài khoản ? Đăng ký ngay !</p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Đăng ký ngay!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
