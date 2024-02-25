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
      <Grid
        container
        spacing={{ xs: 3, md: 5 }}
        justifyContent="space-between"
        flexDirection={{ xs: "column-reverse", md: "row" }}
      >
        <Grid item sm={12} md={4} xs={12}>
          <TemplatesList />
        </Grid>
        <Grid item sm={12} md={8} xs={12}>
          {templateView}
        </Grid>
      </Grid>
      <TemplateAdd />
    </>
  );
};

export default Templates;
