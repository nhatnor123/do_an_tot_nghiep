import axiosClient from "./AxiosClient";
import { setupTokenHeader } from "./TokenUtil";

const apiPath = "/student-course";

const studentCourseApi = {
  create: async (params, token) => {
    const url = `${apiPath}/create`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  update: async (params, token) => {
    const url = `${apiPath}/update`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  getById: async (params, token) => {
    const url = `${apiPath}/get-by-id`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  search: async (params, token) => {
    const url = `${apiPath}/search`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  archive: async (params, token) => {
    const url = `${apiPath}/archive`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  getStudentsNotJoinCourse: async (params, token) => {
    const url = `${apiPath}/get-students-not-join-course`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  getStudentsJoiningCourse: async (params, token) => {
    const url = `${apiPath}/get-students-joining-course`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  leaveCourse: async (params, token) => {
    const url = `${apiPath}/leave-course`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  requestToJoinCourse: async (params, token) => {
    const url = `${apiPath}/request-join-course`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  cancelRequestToJoinCourse: async (params, token) => {
    const url = `${apiPath}/cancel-request-join-course`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  checkIfJoiningCourse: async (params, token) => {
    const url = `${apiPath}/check-if-joining`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
};

export default studentCourseApi;
