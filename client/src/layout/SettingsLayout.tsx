import { Stack, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const pages = [
  { title: "Categories", path: "categories" },
  { title: "Attributes", path: "attributes" },
];

const Settings = () => {
  const navigate = useNavigate();

  const navLinks = pages.map(({ title, path }) => (
    <Button
      key={title}
      onClick={() => navigate(path)}
      sx={{ my: 2, display: "block" }}
    >
      {title}
    </Button>
  ));

  return (
    <>
      <Stack flexDirection="row" alignItems="center">
        {navLinks}
      </Stack>

      <Outlet />
    </>
  );
};

export default Settings;
