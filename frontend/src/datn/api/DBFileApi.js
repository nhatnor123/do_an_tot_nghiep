import axiosClient from "./AxiosClient";

const dbFileApiPath = "/file";

const dbFileApi = {
  upload: (params) => {
    const url = `${dbFileApiPath}/upload`;
    return axiosClient.post(url, params);
  },
  uploadFileUrl: `${process.env.REACT_APP_API_URL}${dbFileApiPath}/upload`,
};

export default dbFileApi;
