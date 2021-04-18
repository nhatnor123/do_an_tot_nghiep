import React from "react";
import { List } from "antd";

import { Link } from "react-router-dom";

import "./LessonGrid.css";

class LessonGrid extends React.Component {
  render() {
    const courseId = this.props.courseId;

    return (
      <div>
        <List
          itemLayout="horizontal"
          style={{ marginTop: "20px" }}
          dataSource={this.props.lessonList}
          renderItem={(lesson) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link
                    to={`/teacher/manageCourse/course/${courseId}/lesson/${lesson.lessonId}`}
                    style={{
                      textDecoration: "none",
                      fontWeight: "600",
                      marginBottom: "12px",
                      marginTop: "10px",
                      color: "#1890ff !important",
                      fontSize: "20px",
                    }}
                    className="link-to-the-lesson"
                  >
                    {lesson.name}
                  </Link>
                }
                description={
                  <div
                    style={{
                      paddingBottom: "23px",
                      borderStyle: "groove",
                      borderWidth: "0 0 0.5px 0",
                    }}
                  >
                    {lesson.description}
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

export default LessonGrid;
