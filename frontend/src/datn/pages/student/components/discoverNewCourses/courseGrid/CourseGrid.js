import React from "react";
import { Col, Row, Tag } from "antd";

import { Link } from "react-router-dom";

import "./CourseGrid.css";

class CourseGrid extends React.Component {
  render() {
    return (
      <div>
        <Row>
          {this.props.courseList.map((course) => {
            return (
              <Col span={6} className="course">
                <div
                  style={{
                    marginLeft: "10px",
                    marginBottom: "40px",
                    width: "92%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={`/student/discoverNewCourses/course/${course.courseId}`}
                  >
                    <img
                      src={course.imageUrl}
                      alt={course.name}
                      class="my-border-image"
                      style={{
                        width: "100%",
                        height: "auto",
                        border: "1px solid #ddd",
                      }}
                    />
                  </Link>

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
                      <Link
                        to={`/student/discoverNewCourses/course/${course.courseId}`}
                        style={{ textDecoration: "none" }}
                        className="link-to-the-course"
                      >
                        {course.name}
                      </Link>
                    </div>
                    <div style={{ color: "#969696" }}>
                      {course.description.substring(0, 200)}
                      {course.description.length > 201 ? "..." : ""}
                    </div>
                    <div style={{ marginTop: "5px" }}>
                      {course.isPublic === true ? (
                        <Tag color="#55acee">Công khai</Tag>
                      ) : (
                        <Tag color="#00a76a">Không Công khai</Tag>
                      )}
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

export default CourseGrid;
