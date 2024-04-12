import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Container,
  Stack,
  IconButton,
  Drawer,
  Box,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Logo from "./Logo";

import { logOut } from "../../store/slices/authSlice";
import { useLogoutMutation } from "../../api/authApi";
import MenuIcon from "@mui/icons-material/Menu";

import UserNavbar from "../user/UserNavbar";
import UserGreetings from "../user/UserGreetings";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser(null).unwrap();
    dispatch(logOut());
    localStorage.clear()
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const MobileNavbar = () => (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box pt={2}>
        <Logo variant="h5" />
      </Box>
      <UserGreetings />
      <ListItem disablePadding>
        <ListItemButton onClick={handleLogout} sx={{ textAlign: "center" }}>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </ListItem>
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
              <UserNavbar />
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
        <MobileNavbar />
      </Drawer>
    </Box>
  );
};

export default NavBar;
