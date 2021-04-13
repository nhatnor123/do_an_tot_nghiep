import React from "react";
import { Col, Row, Tag } from "antd";

import { Link } from "react-router-dom";

class CourseGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          {this.props.courseList.map((course) => {
            console.log("Course =", course);
            return (
              <Col span={8}>
                <div
                  style={{
                    borderStyle: "groove",
                    marginLeft: "10px",
                    marginTop: "20px",
                    width: "90",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={course.imageUrl}
                    alt={course.name}
                    style={{ width: "80%", height: "200px" }}
                  />
                  <div style={{ marginLeft: "15px" }}>
                    <div>
                      <h3
                        style={{
                          fontWeight: "600",
                          marginBottom: "12px",
                          marginTop: "10px",
                          color: "#076ac8",
                        }}
                      >
                        <Link
                          to={`/teacher/manageCourse/course/${course.courseId}`}
                        >
                          {course.name}
                        </Link>
                      </h3>
                    </div>
                    <div style={{ color: "#969696" }}>{course.description}</div>
                    <div>
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
