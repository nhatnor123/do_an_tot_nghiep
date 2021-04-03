import axiosClient from "./AxiosClient";

const authenticationApiPath = "/authenticate";

const authenticationApi = {
  getToken: async (params) => {
    const url = `${authenticationApiPath}/get-token`;
    return axiosClient.post(url, params);
  },
  checkToken: (params, token) => {
    const url = `${authenticationApiPath}/check-token`;
    return axiosClient.post(url, params, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default authenticationApi;
