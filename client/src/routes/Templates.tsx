import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import CategoriesList from "../components/categories/CategoriesList";
import TemplateFilter from "../components/templates/TemplateFilter";
import TemplatesList from "../components/templates/TemplatesList";
import TemplateAdd from "../components/templates/TemplateAdd";

const Templates = () => {
  return (
    <>
      <Typography component="h2" variant="h5">
        My categories
      </Typography>
      <CategoriesList />
      <Divider sx={{ margin: "10px 0" }} />
      <Grid my={2} container spacing={2}>
        <Grid item md={8}>
          <TemplateFilter />
        </Grid>
        <Grid item md={4}>
          <Stack
            height="100%"
            flexDirection="row"
            justifyContent="end"
            alignItems="center"
          >
            <TemplateAdd />
          </Stack>
        </Grid>
      </Grid>
      <TemplatesList />
    </>
  );
};

export default Templates;
