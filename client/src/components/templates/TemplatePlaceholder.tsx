import { Box, Stack, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

const TemplatePlaceholder = () => {
  return (
    <Stack justifyContent="center">
      <Box display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h6" component="h4">
          Select a template to see the details
        </Typography>
        <DescriptionIcon sx={{ color: "gray", fontSize: 50 }} />
      </Box>
    </Stack>
  );
};

export default TemplatePlaceholder;
