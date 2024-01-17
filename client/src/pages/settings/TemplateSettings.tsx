import {
  Typography,
  Box,
  Stack,
  Chip,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import { useGetAttributesQuery } from "../../components/attributes/attributesApi";

import AddIcon from "@mui/icons-material/Add";

const TemplateSettings = () => {
  const {
    data: attributesList,
    isLoading,
    isSuccess,
  } = useGetAttributesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isSuccess) {
    return <p>Attributes wasn't found</p>;
  }

  const renderedAttributes = attributesList.map(
    ({ label, _id: attrId, options }) => (
      <Stack key={attrId} my={2}>
        <Typography mb={1} component="h4" variant="h6">
          {label}
        </Typography>
        <Stack flexDirection="row" gap={2}>
          {options.map(({ name, _id: optionId }) => (
            <Chip
              key={optionId}
              label={name}
              onDelete={() => alert("Deleted")}
            />
          ))}
          <Chip icon={<AddIcon />} label="Add" onClick={() => alert("Added")} />
        </Stack>
      </Stack>
    )
  );

  return (
    <Box component="section">
      <Typography component="h2" variant="h4">
        Template Attributes
      </Typography>
      <Typography component="p" variant="subtitle1">
        Here you can adjust your template attributes
      </Typography>

      <Grid container spacing={2}>
        <Grid item md={6}>
          {renderedAttributes}
        </Grid>
        <Grid item md={6}>
          <Typography component="h4" variant="h5">
            Create Template Attribute
          </Typography>
          <Stack mt={2} alignItems="start" spacing={2} component="form">
            <TextField
              size="small"
              value=""
              label="Attribute Name"
              variant="filled"
            />
            <Button variant="contained" size="small">
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TemplateSettings;
