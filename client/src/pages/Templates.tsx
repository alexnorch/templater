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
        height='70vh'
        mt={1}
        container
        spacing={2}
      >
        <Grid height='100%' item md={4} xs={12}>
          <TemplatesList />
        </Grid>
        <Grid height='100%' item md={8} xs={12}>
          <TemplateView />
        </Grid>
      </Grid>
    </>
  );
};

export default Templates;
