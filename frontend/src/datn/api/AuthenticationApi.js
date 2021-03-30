import axiosClient from "./AxiosClient";

const authenticationUrl = "/authenticate";

const authenticationApi = {
  register: (params) => {
    const url = `${authenticationUrl}/register`;
    return axiosClient.post(url, params);
  },
  getToken: async (params) => {
    const url = `${authenticationUrl}/get-token`;
    return axiosClient.post(url, params);
  },
  checkToken: (params) => {
    const url = `${authenticationUrl}/check-token`;
    return axiosClient.post(url, params);
  },
};

export default authenticationApi;
