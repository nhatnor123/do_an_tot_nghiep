import React, { lazy } from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCallout,
} from "@coreui/react";
import { message } from "antd";
import CIcon from "@coreui/icons-react";

import MainChartExample from "../charts/MainChartExample.js";

import { getAccessToken } from "../../datn/api/TokenUtil";
import StatisticApi from "../../datn/api/StatisticApi";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

message.config({
  top: 80,
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statistics: null,
    };
  }

  componentDidMount() {
    this.getStatistic();
  }

  getStatistic = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await StatisticApi.getSystemStatistics(accessToken);
      console.log("res = ", response);
      this.setState({
        statistics: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy thống kê của hệ thống thất bại", 3);
    }
  };

  render() {
    console.log("render Dashboard");
    console.log("state = ", this.state);
    let stats = this.state.statistics;

    return this.state.statistics ? (
      <>
        <WidgetsDropdown statistics={this.state.statistics} />

        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Thống kê về khóa học</CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs="12" md="6" xl="6">
                    <CRow>
                      <CCol sm="6">
                        <CCallout color="info">
                          <div className="text-muted">Bài học</div>
                          <br />
                          <strong className="h4">{stats.lesson.total}</strong>
                        </CCallout>
                      </CCol>
                      <CCol sm="6">
                        <CCallout color="danger">
                          <div className="text-muted">Bài kiểm tra</div>
                          <br />
                          <strong className="h4">{stats.test.total}</strong>
                        </CCallout>
                      </CCol>
                    </CRow>
                  </CCol>

                  <CCol xs="12" md="6" xl="6">
                    <CRow>
                      <CCol sm="6">
                        <CCallout color="warning">
                          <div className="text-muted">Tài liệu khóa học</div>
                          <br />
                          <strong className="h4">
                            {stats.courseFile.total}
                          </strong>
                        </CCallout>
                      </CCol>
                      <CCol sm="6">
                        <CCallout color="success">
                          <div className="text-muted">Khiếu nại</div>
                          <br />
                          <strong className="h4">
                            {stats.complaint.total}
                          </strong>
                        </CCallout>
                      </CCol>
                    </CRow>
                  </CCol>
                  <hr className="mt-0" />
                </CRow>

                <br />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" className="card-title mb-0">
                  Giáo viên đăng ký mới
                </h4>
              </CCol>
            </CRow>
            <MainChartExample
              style={{ height: "300px", marginTop: "40px" }}
              detailStat={stats.teacher.detail}
              statLabel={"Giáo viên"}
              statColor={"#4dbd74"}
            />
          </CCardBody>
        </CCard>

        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" className="card-title mb-0">
                  Học viên đăng ký mới
                </h4>
              </CCol>
            </CRow>
            <MainChartExample
              style={{ height: "300px", marginTop: "40px" }}
              detailStat={stats.student.detail}
              statLabel={"Học viên"}
              statColor={"#20a8d8"}
            />
          </CCardBody>
        </CCard>

        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" className="card-title mb-0">
                  Khóa học mới
                </h4>
              </CCol>
            </CRow>
            <MainChartExample
              style={{ height: "300px", marginTop: "40px" }}
              detailStat={stats.course.detail}
              statLabel={"Khóa học"}
              statColor={"#f86c6b"}
            />
          </CCardBody>
        </CCard>
      </>
    ) : (
      <div>Loading</div>
    );
  }
}

export default Dashboard;
