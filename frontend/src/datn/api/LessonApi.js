import axiosClient from "./AxiosClient";
import { setupTokenHeader } from "./TokenUtil";

const lessonApiPath = "/lesson";

const lessonApi = {
  create: async (params, token) => {
    const url = `${lessonApiPath}/create`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  update: async (params, token) => {
    const url = `${lessonApiPath}/update`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  getById: async (params, token) => {
    const url = `${lessonApiPath}/get-by-id`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  search: async (params, token) => {
    const url = `${lessonApiPath}/search`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  archive: async (params, token) => {
    const url = `${lessonApiPath}/archive`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
};

export default lessonApi;
