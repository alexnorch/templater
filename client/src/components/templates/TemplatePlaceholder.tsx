import { Box, Stack, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

const TemplatePlaceholder: React.FC = () => {
  return (
    <Stack height='100%' justifyContent="center">
      <Box gap={1} display="flex" alignItems="center" flexDirection="column">
        <Typography>Hover a template to see the details</Typography>
        <DescriptionIcon sx={{ color: "gray", fontSize: 50 }} />
      </Box>
    </Stack>
  );
};

export default TemplatePlaceholder;
