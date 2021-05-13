import React from "react";
import { List } from "antd";

import { Link } from "react-router-dom";

import "./TestGrid.css";

class TestGrid extends React.Component {
  render() {
    const courseId = this.props.courseId;
    console.log("props =", this.props);

    return (
      <div>
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
                    to={`/student/manageCourse/course/${courseId}/test/${test.testId}`}
                    style={{
                      textDecoration: "none",
                      fontWeight: "600",
                      marginBottom: "12px",
                      marginTop: "10px",
                      color: "#1890ff !important",
                      fontSize: "20px",
                    }}
                    className="link-to-the-test"
                  >
                    {test.name}
                  </Link>
                }
                description={
                  <div
                    style={{
                      paddingBottom: "23px",
                      // borderStyle: "groove",
                      // borderWidth: "0 0 0.5px 0",
                    }}
                  >
                    {test.description}
                    <br></br>
                    {"Thời gian: " +
                      test.dateTimeStart.substring(0, 19) +
                      " -> " +
                      test.dateTimeEnd.substring(0, 19)}
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
