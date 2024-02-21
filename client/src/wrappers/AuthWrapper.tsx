import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Stack } from "@mui/material";
import svgImage from "../assets/programmer.svg";

import { selectCurrentToken } from "../components/auth/authSlice";

const AuthWrapper = () => {
  const accessToken = useSelector(selectCurrentToken);

  if (accessToken) {
    return <Navigate to="/templates" />;
  }

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
