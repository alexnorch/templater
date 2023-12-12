import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TemplateFilter from "../components/templates/TemplateFilter";

import TemplatesList from "../components/templates/TemplatesList";
import TemplateAdd from "../components/templates/TemplateAdd";

const CategoryRoute = () => {
  const { category } = useParams();

  return (
    <>
      <Grid my={2} container spacing={2}>
        <Grid item md={4}>
          <Typography variant="h3" component="h1">
            {category}
          </Typography>
          <Typography variant="subtitle1" component="p">
            Current category
          </Typography>
        </Grid>
        <Grid item md={8}>
          <TemplateFilter />
        </Grid>
      </Grid>
      <TemplatesList />
      <TemplateAdd />
    </>
  );
};

export default CategoryRoute;
