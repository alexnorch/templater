import { Grid } from "@mui/material";

import {
  TemplateAdd,
  TemplatesList,
  TemplateFilter,
  TemplateView,
} from "../components/templates";

const Templates = () => {

  return (
    <>
      <TemplateFilter />
      <Grid
        mt={1}
        container
        spacing={2}
        justifyContent="space-between"
        flexDirection={{ xs: "column-reverse", md: "row" }}
      >
        <Grid height='80vh' item sm={12} md={4} xs={12}>
          <TemplatesList />
        </Grid>
        <Grid item sm={12} md={8} xs={12}>
          <TemplateView />
        </Grid>
      </Grid>
      <TemplateAdd />
    </>
  );
};

export default Templates;
