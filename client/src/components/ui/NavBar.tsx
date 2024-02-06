import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AppBar, Toolbar, Container, Stack, Button } from "@mui/material";
import Logo from "./Logo";

import { logOut } from "../auth/authSlice";

const pages = [
  { title: "Templates", path: "/templates" },
  { title: "Settings", path: "/settings/categories" },
];

const btnStyles = { my: 2, color: "white", display: "block" };

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logOut());
  };

  const renderedLinks = pages.map(({ title, path }) => (
    <Button key={title} onClick={() => navigate(path)} sx={btnStyles}>
      {title}
    </Button>
  ));

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
              {renderedLinks}
            </Stack>
            <Button onClick={handleLogout} sx={btnStyles}>
              Log Out
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
