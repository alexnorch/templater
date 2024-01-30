import { Typography, Box } from "@mui/material";
import AttributeAdd from "../../components/attributes/AttributeAdd";
import AttributesList from "../../components/attributes/AttributesList";

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
