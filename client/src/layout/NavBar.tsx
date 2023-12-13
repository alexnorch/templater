import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Logo from "../components/ui/Logo";

const pages = [
  { title: "Templates", path: "/templates" },
  { title: "Profile", path: "/" },
];

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            width="100%"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Logo />
            <Stack flexDirection="row" alignItems="center">
              {pages.map(({ title, path }) => (
                <Button
                  key={title}
                  onClick={() => navigate(path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {title}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
