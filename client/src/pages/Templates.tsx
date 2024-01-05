import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Grid } from "@mui/material";

import TemplateFilter from "../components/templates/TemplateFilter";
import TemplatesList from "../components/templates/TemplatesList";
import TemplateAdd from "../components/templates/TemplateAdd";
import useTemplateServices from "../hooks/useTemplateServices";
import useCategoryServices from "../hooks/useCategoryServices";
import TemplateOverview from "../components/templates/TemplateOverview";

const Templates = () => {
  const { queryObj } = useSelector((state: RootState) => state.template);
  const { category, gender, language, title } = queryObj;

  const { fetchTemplates } = useTemplateServices();
  const { fetchCategories } = useCategoryServices();

  useEffect(() => {
    fetchTemplates();
  }, [category, gender, language, title]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <TemplateFilter />
      <Grid spacing={5} container>
        <Grid item md={6}>
          <TemplatesList />
        </Grid>
        <Grid item md={6}>
          <TemplateOverview />
        </Grid>
      </Grid>
      <TemplateAdd />
    </>
  );
};

export default Templates;
