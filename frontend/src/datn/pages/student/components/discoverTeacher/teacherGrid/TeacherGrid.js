import React from "react";
import { Col, Row } from "antd";

import "./TeacherGrid.css";

class TeacherGrid extends React.Component {
  render() {
    return (
      <div>
        <Row>
          {this.props.teacherList.map((teacher) => {
            return (
              <Col span={6} className="course">
                <div
                  style={{
                    marginLeft: "10px",
                    marginTop: "20px",
                    width: "90",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={teacher.imageUrl}
                    alt={teacher.teacher.displayName}
                    style={{
                      width: "100%",
                      height: "auto",
                      border: "1px solid #ddd",
                    }}
                  />

                  <div style={{ marginLeft: "15px" }}>
                    <div
                      style={{
                        fontWeight: "600",
                        marginBottom: "12px",
                        marginTop: "10px",
                        color: "#076ac8 !important",
                        fontSize: "16px",
                      }}
                    >
                      {teacher.teacher.displayName}
                    </div>
                    <div style={{ color: "#969696" }}>
                      {teacher.teacher.description.substring(0, 200)}
                      {teacher.teacher.description.length > 201 ? "..." : ""}
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default TeacherGrid;
