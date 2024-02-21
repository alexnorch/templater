import { Stack, Alert } from "@mui/material";
import { Link } from "react-router-dom";

const NoCategoriesMessage = () => {
  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      p={2}
      gap={2}
      borderRadius={2}
      sx={{ backgroundColor: "#b3e5fc", color: "#333" }}
    >
      <Alert severity="info">
        In order to create a template, start by making your first category.
        Simply go to <Link to="/settings/categories">Settings</Link> and create
        your initial template category.
      </Alert>
    </Stack>
  );
};

export default NoCategoriesMessage;
