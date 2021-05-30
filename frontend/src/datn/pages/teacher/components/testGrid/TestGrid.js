import React from "react";
import { List, Tag } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

import "./TestGrid.css";

class TestGrid extends React.Component {
  render() {
    const courseId = this.props.courseId;
    console.log("props =", this.props);

    return (
      <div style={{ width: "85%", marginBottom: "150px" }}>
        <List
          itemLayout="horizontal"
          style={{ marginTop: "20px", marginBottom: "30px" }}
          dataSource={this.props.testList}
          bordered={true}
          renderItem={(test) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link
                    to={`/teacher/manageCourse/course/${courseId}/test/${test.testId}`}
                    style={{
                      textDecoration: "none",
                      fontWeight: "600",
                      marginBottom: "12px",
                      marginTop: "10px",
                      color: "#1890ff !important",
                      fontSize: "21px",
                    }}
                    className="link-to-the-test"
                  >
                    {test.name}
                  </Link>
                }
                description={
                  <div
                    style={{
                      paddingBottom: "10px",
                      fontSize: "16px",
                    }}
                  >
                    <div style={{ marginBottom: "10px" }}>
                      {"Thời gian: " +
                        test.dateTimeStart.substring(0, 19) +
                        " ---> " +
                        test.dateTimeEnd.substring(0, 19)}
                    </div>
                    {test.description}
                    <br></br>

                    <div style={{ marginTop: "5px" }}>
                      {moment().isBefore(moment(test.dateTimeStart)) ? (
                        <Tag color="#55acee" style={{ fontSize: "15px" }}>
                          Chưa diễn ra
                        </Tag>
                      ) : moment().isBefore(moment(test.dateTimeEnd)) ? (
                        <Tag color="#00a76a" style={{ fontSize: "15px" }}>
                          Đang diễn ra
                        </Tag>
                      ) : (
                        <Tag color="#00a76a" style={{ fontSize: "15px" }}>
                          Đã kết thúc
                        </Tag>
                      )}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default TestGrid;
