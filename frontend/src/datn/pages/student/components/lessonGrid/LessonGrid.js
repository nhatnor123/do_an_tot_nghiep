import React from "react";
import { List } from "antd";

import { Link } from "react-router-dom";

import "./LessonGrid.css";

class LessonGrid extends React.Component {
  render() {
    const courseId = this.props.courseId;

    return (
      <div style={{ width: "85%", marginBottom: "150px" }}>
        <List
          itemLayout="horizontal"
          style={{ marginTop: "20px", marginBottom: "30px" }}
          dataSource={this.props.lessonList}
          bordered={true}
          renderItem={(lesson) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link
                    to={`/student/manageCourse/course/${courseId}/lesson/${lesson.lessonId}`}
                    style={{
                      textDecoration: "none",
                      fontWeight: "600",
                      marginBottom: "12px",
                      marginTop: "10px",
                      color: "#1890ff !important",
                      fontSize: "21px",
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
                      fontSize: "16px",
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
