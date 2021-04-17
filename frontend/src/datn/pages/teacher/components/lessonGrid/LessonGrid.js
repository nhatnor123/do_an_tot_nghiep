import React from "react";
import { Col, Row, Tag } from "antd";

import { Link } from "react-router-dom";

class LessonGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const courseId = this.props.courseId;

    return (
      <div>
        <Row>
          {this.props.lessonList.map((lesson) => {
            console.log("Lesson =", lesson);
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
                          to={`/teacher/manageCourse/course/${courseId}/lesson/${lesson.lessonId}`}
                        >
                          {lesson.name}
                        </Link>
                      </h3>
                    </div>
                    <div style={{ color: "#969696" }}>{lesson.description}</div>
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

export default LessonGrid;
