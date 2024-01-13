import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Snackbar, Box, Container, Alert } from "@mui/material";
import NavBar from "./NavBar";

import { RootState } from "../store";
import { hideAlert } from "../store/reducers/appSlice";

const AppLayout = () => {
  const isAlert = useSelector((state: RootState) => state.app.isAlert);
  const alertText = useSelector((state: RootState) => state.app.alertText);
  const dispatch = useDispatch();

  const handleCloseAlert = () => {
    dispatch(hideAlert());
  };

  return (
    <>
      <NavBar />
      <Box component="main" mt={2}>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>

      <Snackbar
        open={isAlert}
        autoHideDuration={1500}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="info"
          sx={{ width: "100%" }}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AppLayout;
