import { useDispatch } from "react-redux";
import { showAlert } from "../store/reducers/appReducer";

const useAlert = () => {
  const dispatch = useDispatch();

  const showSuccessAlert = (text: string) => {
    dispatch(showAlert({ type: "success", text }));
  };

  const showErrorAlert = (text: string) => {
    dispatch(showAlert({ type: "error", text }));
  };

  const showInfoAlert = (text: string) => {
    dispatch(showAlert({ type: "info", text }));
  };

  const showWarningAlert = (text: string) => {
    dispatch(showAlert({ type: "warning", text }));
  };

  return {
    showSuccessAlert,
    showErrorAlert,
    showInfoAlert,
    showWarningAlert,
  };
};

export default useAlert;
