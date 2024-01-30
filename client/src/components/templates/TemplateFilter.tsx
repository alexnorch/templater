import { Grid, Box } from "@mui/material";
import FilterByAttribute from "../filters/FilterByAttribute";
import FilterByTitle from "../filters/FilterByTitle";
import FilterByCategory from "../filters/FilterByCategory";

const TemplateFilter = () => {
  return (
    <Box my={4}>
      <Grid my={2} container justifyContent="space-between" alignItems="center">
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
