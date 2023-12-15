import { Outlet, useLocation, Link } from "react-router-dom";
import { Stack, Typography, Box } from "@mui/material";
import Logo from "../components/ui/Logo";

const AuthLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname.includes("login");

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
      <Link to="/templates">Go to the templates</Link>
      <Logo component="h1" variant="h4" />
      <Box>{isLoginPage ? LoginHeader : RegisterHeader}</Box>
      <Outlet />
    </Stack>
  );
};

export default AuthLayout;
