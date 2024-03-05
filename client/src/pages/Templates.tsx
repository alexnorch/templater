import { Grid } from "@mui/material";
import { useParams, Outlet } from "react-router-dom";

import {
  TemplateAdd,
  TemplatesList,
  TemplateFilter,
} from "../components/templates";
import _TemplateView from "../components/templates/_TemplateView";


const Templates = () => {
  const { templateId } = useParams();
  const content = templateId ? <Outlet /> : <_TemplateView />

  return (
    <>
      <TemplateFilter />
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        flexDirection={{ xs: "column-reverse", md: "row" }}
      >
        <Grid item sm={12} md={4} xs={12}>
          <TemplatesList />
        </Grid>
        <Grid item sm={12} md={8} xs={12}>
          {content}
        </Grid>
      </Grid>
      <TemplateAdd />
    </>
  );
};

export default Templates;
