import { useSelector } from "react-redux";
import {
  Typography,
  Box,
  Stack,
  Chip,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { RootState } from "../../store";

const selectCustomAttributes = (state: RootState) =>
  state.filter.customAttributes;

import AddIcon from "@mui/icons-material/Add";

const TemplateSettings = () => {
  const customAttributes = useSelector(selectCustomAttributes);

  const templateAttributes = customAttributes.map(
    ({ label, options }, index) => (
      <Stack my={2}>
        <Typography mb={1} component="h4" variant="h6">
          {label}
        </Typography>
        <Stack flexDirection="row" gap={2}>
          {options.map((option) => (
            <Chip label={option} onDelete={() => alert("Deleted")} />
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
          {templateAttributes}
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
