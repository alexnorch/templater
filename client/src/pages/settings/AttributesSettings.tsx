import { Typography, Box } from "@mui/material";
import { AttributeAdd, AttributesList } from "../../components/attributes";

const AttributesSettings = () => {
  return (
    <Box component="section">
      <Typography component="h2" variant="h4">
        Attributes
      </Typography>
      <AttributesList />
      <AttributeAdd />
    </Box>
  );
};

export default AttributesSettings;
