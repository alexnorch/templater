import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Container,
  Stack,
  Button,
  IconButton,
  Drawer,
  Box,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Logo from "./Logo";
import LogoutIcon from "@mui/icons-material/Logout";

import { logOut } from "../auth/authSlice";
import { useLogoutMutation } from "../../api/authApi";
import MenuIcon from "@mui/icons-material/Menu";

const pages = [
  { title: "Templates", path: "/templates" },
  { title: "Settings", path: "/settings/categories" },
];

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    await logoutUser(null).unwrap();
    dispatch(logOut());
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const LinkList = () => (
    <Box
      sx={{
        display: { sm: "flex", xs: "none" },
        justifyContent: "space-between",
        flexBasis: "60%",
      }}
    >
      <Box>
        {pages.map(({ title, path }) => (
          <Button
            key={title}
            onClick={() => navigate(path)}
            sx={{ my: 2, color: "white" }}
          >
            {title}
          </Button>
        ))}
      </Box>

      <Button
        color="secondary"
        variant="contained"
        onClick={handleLogout}
        sx={{ my: 2, color: "white" }}
        endIcon={<LogoutIcon />}
      >
        Logout
      </Button>
    </Box>
  );

  const DrawerContent = () => (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box p={2}>
        <Logo variant="h5" />
      </Box>
      {pages.map(({ title, path }) => (
        <ListItem key={title} divider disablePadding>
          <ListItemButton
            onClick={() => navigate(path)}
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary={title} />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem disablePadding>
        <ListItemButton onClick={handleLogout} sx={{ textAlign: "center" }}>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <Box>
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
              <LinkList />
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}
              >
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        <DrawerContent />
      </Drawer>
    </Box>
  );
};

export default NavBar;
