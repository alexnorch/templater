import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback, NavBar } from "../components/ui";
import "react-toastify/dist/ReactToastify.css";

import { Container } from "@mui/material";

const AppWrapper: React.FC = () => {
  return (
    <>
      <NavBar />
      <Container sx={{ mt: 2 }} component="main" maxWidth="xl">
        <ErrorBoundary fallbackRender={Fallback}>
          <Outlet />
        </ErrorBoundary>
      </Container>
      <ToastContainer
        limit={1}
        hideProgressBar={true}
        position="bottom-center"
      />
    </>
  );
};
export default AppWrapper;
