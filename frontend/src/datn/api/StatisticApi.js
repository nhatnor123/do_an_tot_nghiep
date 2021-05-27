import axiosClient from "./AxiosClient";
import { setupTokenHeader } from "./TokenUtil";

const apiPath = "/statistic";

const statisticApi = {
  getSystemStatistics: async (token) => {
    const url = `${apiPath}/get-system-statistics`;
    return axiosClient.get(url, setupTokenHeader(token));
  },
};

export default statisticApi;
