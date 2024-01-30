import { Stack, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Link } from "react-router-dom";

const NoCategoriesMessage = () => {
  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      p={2}
      gap={2}
      borderRadius={2}
      sx={{ backgroundColor: "#87ceeb", color: "#333" }}
    >
      <WarningAmberIcon />
      <Typography>
        In order to create a template, start by making your first category.
        Simply go to{" "}
        <Link style={{ color: "#fff" }} to="/settings/categories">
          Settings
        </Link>{" "}
        and create your initial template category.
      </Typography>
    </Stack>
  );
};

export default NoCategoriesMessage;
