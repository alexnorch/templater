import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Stack, Box } from "@mui/material";
import svgImage from "../assets/programmer.svg";

import { selectCurrentToken } from "../store/slices/authSlice";

const AuthWrapper = () => {
  const accessToken = useSelector(selectCurrentToken);

  if (accessToken) {
    return <Navigate to="/templates" />;
  }

  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Stack
        p={2}
        flexDirection="row"
        flexWrap={{ xs: "wrap", md: "nowrap" }}
        justifyContent="center"
        alignItems="center"
        gap={5}
      >
        <Box sx={{ maxWidth: 400, width: "100%", flexShrink: 0 }}>
          <Outlet />
        </Box>
        <Box maxWidth={600}>
          <img src={svgImage} alt="" />
        </Box>
      </Stack>
      <ToastContainer limit={1} hideProgressBar={true} position="top-center" />
    </Stack>
  );
};

export default AuthWrapper;
