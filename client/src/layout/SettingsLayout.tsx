import { Stack, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const pages = [
  { title: "Categories", path: "categories" },
  { title: "Attributes", path: "attributes" },
];

const Settings = () => {
  const navigate = useNavigate();

  const navLinks = pages.map(({ title, path }) => (
    <Button key={title} onClick={() => navigate(path)} sx={{ my: 1 }}>
      {title}
    </Button>
  ));

  return (
    <>
      <Stack flexDirection="row" gap={2} alignItems="center">
        {navLinks}
      </Stack>

      <Outlet />
    </>
  );
};

export default Settings;
