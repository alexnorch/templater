import { Typography, Box, Stack, Chip, Grid, Button } from "@mui/material";
import AttributeAdd from "../../components/attributes/AttributeAdd";
import AttributesList from "../../components/attributes/AttributesList";

import { useGetAttributesQuery } from "../../components/attributes/attributeSlice";

const AttributesSettings = () => {
  return (
    <Box component="section">
      <Typography component="h2" variant="h4">
        Template Attributes
      </Typography>
      <Typography component="p" variant="subtitle1">
        Here you can adjust your template attributes
      </Typography>

      <Grid mt={2} container spacing={2}>
        <AttributesList />
      </Grid>
      <AttributeAdd />
    </Box>
  );
};

export default AttributesSettings;
