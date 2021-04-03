import axiosClient from "./AxiosClient";
import { setupTokenHeader } from "./TokenUtil";

const accountApiPath = "/account";

const accountApi = {
  register: (params) => {
    const url = `${accountApiPath}/register`;
    return axiosClient.post(url, params);
  },
  getSelfAccount: async (token) => {
    const url = `${accountApiPath}/get-token`;
    return axiosClient.get(url, setupTokenHeader(token));
  },
  create: async (params, token) => {
    const url = `${accountApiPath}/create`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  updateSelfAccount: async (params, token) => {
    const url = `${accountApiPath}/update-self-account`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  getById: async (params, token) => {
    const url = `${accountApiPath}/get-by-id`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  search: async (params, token) => {
    const url = `${accountApiPath}/search`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  lock: async (params, token) => {
    const url = `${accountApiPath}/lock`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
  unlock: async (params, token) => {
    const url = `${accountApiPath}/unlock`;
    return axiosClient.post(url, params, setupTokenHeader(token));
  },
};

export default accountApi;
