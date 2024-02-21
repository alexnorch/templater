import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { ToastContainer } from "react-toastify";
import svgImage from "../assets/programmer.svg";

const AuthWrapper = () => {
  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Stack flexDirection="row" alignItems="center" gap={5}>
        <Outlet />
        <img width={550} src={svgImage} alt="" />
      </Stack>
      <ToastContainer limit={1} hideProgressBar={true} position="top-center" />
    </Stack>
  );
};

export default AuthWrapper;
