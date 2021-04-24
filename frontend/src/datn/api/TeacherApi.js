import axiosClient from "./AxiosClient";
import { setupTokenHeader } from "./TokenUtil";

const apiPath = "/teacher";

const teacherApi = {
  discoverTeachers: async (token) => {
    const url = `${apiPath}/discover-teachers`;
    return axiosClient.get(url, setupTokenHeader(token));
  },
};

export default teacherApi;
