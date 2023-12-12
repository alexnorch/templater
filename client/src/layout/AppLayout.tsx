import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <Box component="main" mt={2}>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default AppLayout;
