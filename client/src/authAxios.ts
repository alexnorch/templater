import axios from "axios";

const authAxios = axios.create();
const accessToken = localStorage.getItem("accessToken");

authAxios.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.request.status === 401) {
      // localStorage.removeItem("accessToken");
    }

    const errorMsg = error.response.data.message;
    console.log(errorMsg);

    return error;
  }
);

export default authAxios;
