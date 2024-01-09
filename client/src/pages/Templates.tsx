import { useEffect } from "react";
import { Grid } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";

import TemplateFilter from "../components/templates/TemplateFilter";
import TemplatesList from "../components/templates/TemplatesList";
import TemplateAdd from "../components/templates/TemplateAdd";
import TemplatePlaceholder from "../components/templates/TemplatePlaceholder";

import useTemplateServices from "../services/useTemplateServices";

const Templates = () => {
  const { templateId } = useParams();
  const { getAllTemplates, queryObj } = useTemplateServices();

  useEffect(() => {
    getAllTemplates();
  }, [queryObj.category, queryObj.gender, queryObj.language]);

  return (
    <>
      <TemplateFilter />
      <Grid spacing={5} container justifyContent="space-between">
        <Grid item md={4}>
          <TemplatesList />
        </Grid>
        <Grid item md={6}>
          {!templateId && <TemplatePlaceholder />}
          <Outlet />
        </Grid>
      </Grid>
      <TemplateAdd />
    </>
  );
};

export default Templates;
