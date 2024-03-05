import { Outlet, NavLink } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import { styled } from "@mui/system";

const SETTINGS_PAGES = [
  { title: "Profile", path: "profile" },
  { title: "Categories", path: "categories" },
  { title: "Attributes", path: "attributes" },
];

const StyledLink = styled(NavLink)({
  textDecoration: "none",
  fontSize: 18,
  fontWeight: 400,
});

const SettingsWrapper = () => {
  const navLinks = SETTINGS_PAGES.map(({ title, path }) => (
    <StyledLink
      key={title}
      to={path}
      style={({ isActive }) => {
        return {
          color: isActive ? "#1976d2" : "#333",
        };
      }}
    >
      {title}
    </StyledLink>
  ));

  return (
    <>
      <Stack mt={3} flexDirection="row" gap={2} alignItems="center" flexWrap='wrap'>
        {navLinks}
      </Stack>
      <Box mt={2} component="section">
        <Outlet />
      </Box>
    </>
  );
};

export default SettingsWrapper;
