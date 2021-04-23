import axiosClient from "./AxiosClient";
import { setupTokenHeader } from "./TokenUtil";

const courseApiPath = "/course";

const courseApi = {
  create: async (params, token) => {
    const url = `${courseApiPath}/create`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  updateCourseInfo: async (params, token) => {
    const url = `${courseApiPath}/update-course-info`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  getById: async (params, token) => {
    const url = `${courseApiPath}/get-by-id`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  search: async (params, token) => {
    const url = `${courseApiPath}/search`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  archive: async (params, token) => {
    const url = `${courseApiPath}/archive`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  getCoursesStudentJoining: async (token) => {
    const url = `${courseApiPath}/get-courses-joining`;
    return axiosClient.get(url, setupTokenHeader(token));
  },
  getCoursesStudentCanJoin: async (token) => {
    const url = `${courseApiPath}/get-courses-can-join`;
    return axiosClient.get(url, setupTokenHeader(token));
  },
};

export default courseApi;
