import { Outlet } from "react-router-dom";

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
    </>
  );
};

export default AppWrapper;
