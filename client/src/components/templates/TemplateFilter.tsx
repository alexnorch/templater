import { Grid, Box } from "@mui/material";
import { FilterByAttribute, FilterByTitle, FilterByCategory } from "../filters";

const TemplateFilter = () => {
  return (
    <Box mb={5}>
      <Grid my={1} container justifyContent="space-between" alignItems="center">
        <Grid item md={4}>
          <FilterByTitle />
        </Grid>
        <Grid item>
          <FilterByAttribute />
        </Grid>
      </Grid>
      <FilterByCategory />
    </Box>
  );
};

export default TemplateFilter;
