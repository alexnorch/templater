import { Typography, Box, Grid, Divider } from "@mui/material";
import CategoriesList from "../components/categories/CategoriesList";
import CategoryAdd from "../components/categories/CategoryAdd";

const Settings = () => {
  return (
    <>
      {/* Categories */}
      <Box component="section">
        <Typography component="h2" variant="h4">
          Categories
        </Typography>
        <Typography component="p" variant="subtitle1">
          Here you can adjust your categories
        </Typography>
        <Divider sx={{ margin: "15px 0" }} />
        <Grid spacing={10} container>
          <Grid item md={8}>
            <CategoriesList />
          </Grid>
          <Grid item md={4}>
            <CategoryAdd />
          </Grid>
        </Grid>
      </Box>
      {/* User */}
      <Box mt={5} component="section">
        <Typography component="h2" variant="h4">
          User
        </Typography>
        <Typography component="p" variant="subtitle1">
          Here you can adjust profile
        </Typography>
        <Divider sx={{ margin: "15px 0" }} />
      </Box>
    </>
  );
};

export default Settings;
