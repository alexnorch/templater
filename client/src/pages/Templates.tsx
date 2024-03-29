import { Grid } from "@mui/material";

import {
  TemplatesList,
  TemplateView,
  TemplateNavbar
} from "../components/templates";

const Templates: React.FC = () => {

  return (
    <>
      <TemplateNavbar />
      <Grid
        height='75vh'
        mt={1}
        container
        spacing={2}
        justifyContent="space-between"
        flexDirection={{ xs: "column-reverse", md: "row" }}
      >
        <Grid height='100%' item sm={12} md={4} xs={12}>
          <TemplatesList />
        </Grid>
        <Grid height='100%' item sm={12} md={8} xs={12}>
          <TemplateView />
        </Grid>
      </Grid>
    </>
  );
};

export default Templates;
