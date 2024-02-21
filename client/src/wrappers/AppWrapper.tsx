import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box, Container } from "@mui/material";
import NavBar from "../components/ui/NavBar";

const AppWrapper = () => {
  return (
    <>
      <NavBar />
      <Box component="main" mt={2}>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
      <ToastContainer
        limit={1}
        hideProgressBar={true}
        position="bottom-center"
      />
    </>
  );
};
export default AppWrapper;
