import axiosClient from "./AxiosClient";
import { setupTokenHeader } from "./TokenUtil";

const apiPath = "/complaint";

const complaintApi = {
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
};

export default complaintApi;
