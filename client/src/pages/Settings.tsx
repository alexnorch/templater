import { Typography, Box, Grid } from "@mui/material";
import CategoriesList from "../components/categories/CategoriesList";
import CategoryAdd from "../components/categories/CategoryAdd";

const Settings = () => {
  return (
    <>
      {/* Categories */}
      <Box component="section">
        <Box mb={2}>
          <Typography component="h2" variant="h4">
            Categories
          </Typography>
          <Typography component="p" variant="subtitle1">
            Here you can adjust your categories
          </Typography>
        </Box>
        <Grid spacing={10} container>
          <Grid item md={9}>
            <CategoriesList />
          </Grid>
          <Grid item md={3}>
            <CategoryAdd />
          </Grid>
        </Grid>
      </Box>
      {/* Templates */}
      <Box mt={5} component="section">
        <Typography component="h2" variant="h4">
          Templates
        </Typography>
        <Typography component="p" variant="subtitle1">
          Here you can adjust your template settings
        </Typography>
      </Box>
      {/* User */}
      <Box mt={5} component="section">
        <Typography component="h2" variant="h4">
          User
        </Typography>
        <Typography component="p" variant="subtitle1">
          Here you can adjust profile
        </Typography>
      </Box>
    </>
  );
};

export default Settings;
