import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { showAlert } from "../store/reducers/appReducer";
import { logoutUser } from "../store/reducers/userReducer";
import useAlert from "./useAlert";

const useAuthAxios = () => {
  const authAxios = axios.create();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const { showErrorAlert } = useAlert();

  const dispatch = useDispatch();

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
        dispatch(logoutUser());
      }

      const errorMsg = error.response.data.message;
      showErrorAlert(errorMsg);

      return error;
    }
  );

  return { authAxios };
};

export default useAuthAxios;
