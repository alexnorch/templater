import { Outlet, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Stack, Typography, Box, Alert, Snackbar } from "@mui/material";
import Logo from "../components/ui/Logo";
import { hideAlert } from "../store/reducers/appReducer";

const AuthLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname.includes("login");

  const { isAlert, alertText, alertType } = useSelector(
    (state: RootState) => state.app
  );
  const dispatch = useDispatch();

  const handleCloseAlert = () => {
    dispatch(hideAlert());
  };

  const LoginHeader = (
    <Typography>
      Don't have an account? <Link to="/register">Register</Link>
    </Typography>
  );

  const RegisterHeader = (
    <Typography>
      Already have an account? <Link to="/login">Log in</Link>
    </Typography>
  );

  return (
    <Stack
      height="100vh"
      component="main"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Logo component="h1" variant="h4" />
      <Box>{isLoginPage ? LoginHeader : RegisterHeader}</Box>
      <Outlet />
      <Snackbar
        open={isAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default AuthLayout;
