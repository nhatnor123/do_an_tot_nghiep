import React from "react";
import { Input, message, Row, Col } from "antd";

import TestGrid from "../testGrid/TestGrid";

import TestApi from "../../../../api/TestApi";
import { getAccessToken } from "../../../../api/TokenUtil";

class ManageTest extends React.Component {
  constructor(props) {
    super(props);
    this.formRefCreateNewTest = React.createRef();
    this.state = {
      isModalCreateNewTestVisible: false,
      testList: [],
      defaultTestData: [
        {
          type: "MULTI_CHOICE_ONE",
          autoCheck: true,
          score: 1,
          question: "",
          option: [
            {
              content: "",
            },
          ],
          answer: [0],
        },
      ],
      testData: [],
    };
  }

  componentDidMount() {
    this.getTestList();
    this.setState({
      testData: this.state.defaultTestData,
    });
  }

  getTestList = async () => {
    var accessToken = getAccessToken();
    try {
      const response = await TestApi.search(
        {
          testId: 0,
          courseId: this.props.courseId,
          name: "",
          description: "",
          content: "",
          answer: "",
          dateTimeStartFrom: "",
          dateTimeStartTo: "",
          dateTimeEndFrom: "",
          dateTimeEndTo: "",
          createdAtFrom: "",
          createdAtTo: "",
          updatedAtFrom: "",
          updatedAtTo: "",
          fieldList: ["courseId"],
        },
        accessToken
      );
      console.log("res = ", response);
      this.setState({
        testList: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách bài kiểm tra thất bại", 3);
    }
  };

  showModalCreateNewTest = () => {
    this.setState({
      isModalCreateNewTestVisible: true,
    });
  };

  onCloseModalCreateNewTest = () => {
    this.setState({
      isModalCreateNewTestVisible: false,
    });
  };

  handleResetFormCreateNewTest = () => {
    this.formRefCreateNewTest.current.resetFields();
  };

  handleSubmitCreateNewTest = async (value) => {
    var accessToken = getAccessToken();

    var answer = [];

    var modifiedContent = value.content.map((content) => {
      let trueAnswer = [];
      let response = {
        question: content.question,
        option: content.option.map((option, optionIndex) => {
          if (option.isTrueAnswer === "true") {
            trueAnswer.push(optionIndex);
          }
          return {
            value: option.value,
          };
        }),
        type: content.type,
        autoCheck: content.autoCheck === "true" ? true : false,
        score: content.score,
      };
      answer.push(trueAnswer);

      return response;
    });

    var req = {
      courseId: this.props.courseId,
      name: value.name,
      description: value.description,
      content: JSON.stringify({
        originContent: value.content,
        modifiedContent,
      }),
      answer: JSON.stringify(answer),
      dateTimeStart:
        value.dateStart.format("YYYY-MM-DD HH:mm:ss").substring(0, 11) +
        value.timeStart.format("YYYY-MM-DD HH:mm:ss").substring(11, 19),
      dateTimeEnd:
        value.dateEnd.format("YYYY-MM-DD HH:mm:ss").substring(0, 11) +
        value.timeEnd.format("YYYY-MM-DD HH:mm:ss").substring(11, 19),
    };
    console.log(req);
    try {
      const response = await TestApi.create(req, accessToken);
      console.log("resp = ", response);
      message.success("Thêm mới bài kiểm tra thành công", 3);
      this.onCloseModalCreateNewTest();
      this.getTestList();
      this.handleResetFormCreateNewTest();
    } catch (e) {
      console.error(e);
      message.error("Thêm mới bài kiểm tra thất bại", 3);
    }
  };

  handleSearchTest = async (value, event) => {
    var accessToken = getAccessToken();
    try {
      const response = await TestApi.search(
        {
          testId: 0,
          courseId: this.props.courseId,
          name: value,
          description: "",
          content: "",
          answer: "",
          dateTimeStartFrom: "",
          dateTimeStartTo: "",
          dateTimeEndFrom: "",
          dateTimeEndTo: "",
          createdAtFrom: "",
          createdAtTo: "",
          updatedAtFrom: "",
          updatedAtTo: "",
          fieldList: ["courseId", "name"],
        },
        accessToken
      );
      console.log("res = ", response);
      this.setState({
        testList: response,
      });
    } catch (e) {
      console.error(e);
      message.error("Lấy danh sách bài học của giáo viên thất bại", 3);
    }
  };

  handleAddNewOption(testIdx) {
    var testData = this.state.testData;

    this.setState({
      testData: [
        ...testData.slice(0, testIdx),
        {
          ...testData[testIdx],
          option: [...testData[testIdx].option, { content: "" }],
        },
        ...testData.slice(testIdx + 1, testData.length),
      ],
    });
  }

  handleDeleteOption(testIdx, optionIdx) {
    var testData = this.state.testData;

    this.setState({
      testData: [
        ...testData.slice(0, testIdx),
        {
          ...testData[testIdx],
          option: [
            ...testData[testIdx].option.slice(0, optionIdx),
            ...testData[testIdx].option.slice(
              optionIdx + 1,
              testData[testIdx].option.length
            ),
          ],
        },
        ...testData.slice(testIdx + 1, testData.length),
      ],
    });
  }

  handleAddNewQuestion = () => {
    this.setState({
      testData: [
        ...this.state.testData,
        {
          type: "MULTI_CHOICE_ONE",
          autoCheck: true,
          score: 1,
          question: "",
          option: [
            {
              content: "",
            },
          ],
          answer: [0],
        },
      ],
    });
  };

  handleDeleteQuestion = (index) => {
    var testData = this.state.testData;

    this.setState({
      testData: [
        ...testData.slice(0, index - 1),
        ...testData.slice(index + 1, testData.length),
      ],
    });
  };

  render() {
    console.log("render manageTest");
    console.log("state =", this.state);

    return (
      <div>
        <Row style={{ marginTop: "10px" }}>
          <Col span={5} offset={5}>
            <Input.Search
              placeholder="Tìm kiếm bài kiểm tra"
              onSearch={this.handleSearchTest}
              enterButton
            />
          </Col>
        </Row>

        <div>
          <TestGrid
            courseId={this.props.courseId}
            testList={this.state.testList}
          />
        </div>
      </div>
    );
  }
}

export default ManageTest;
