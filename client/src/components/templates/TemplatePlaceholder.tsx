import { Box, Stack, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

const containerStyles = { backgroundColor: "#ccc", minHeight: "50vh" };
const iconStyles = { color: "gray", fontSize: 50 };

const TemplatePlaceholder = () => {
  return (
    <Stack sx={containerStyles} justifyContent="center">
      <Box gap={1} display="flex" alignItems="center" flexDirection="column">
        <Typography>Select a template to see the details</Typography>
        <DescriptionIcon sx={iconStyles} />
      </Box>
    </Stack>
  );
};

export default TemplatePlaceholder;
