import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Logo from "../components/ui/Logo";

import { logoutUser } from "../store/reducers/userReducer";

const pages = [
  { title: "Templates", path: "/" },
  { title: "Settings", path: "/settings" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
  };

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
            <Button
              onClick={handleLogout}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Log Out
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
