import { useParams, Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import TemplatesList from "../components/templates/TemplatesList";
import TemplateAdd from "../components/templates/TemplateAdd";
import TemplatePlaceholder from "../components/templates/TemplatePlaceholder";

import TemplateFilter from "../components/templates/TemplateFilter";

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
