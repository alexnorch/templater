import { useParams, Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

import {
  TemplateAdd,
  TemplatesList,
  TemplatePlaceholder,
  TemplateFilter,
} from "../components/templates";

const Templates = () => {
  const { templateId } = useParams();
  const templateView = templateId ? <Outlet /> : <TemplatePlaceholder />;

  return (
    <>
      <TemplateFilter />
      <Grid spacing={5} container justifyContent="space-between">
        <Grid item md={4}>
          <TemplatesList />
        </Grid>
        <Grid item md={8}>
          {templateView}
        </Grid>
      </Grid>
      <TemplateAdd />
    </>
  );
};

export default Templates;
