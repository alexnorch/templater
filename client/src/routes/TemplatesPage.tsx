import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import CategoriesNav from "../components/categories/CategoriesNav";
import TemplateFilter from "../components/templates/TemplateFilter";
import TemplatesList from "../components/templates/TemplatesList";
import TemplateAdd from "../components/templates/TemplateAdd";
import CategoriesOptions from "../components/categories/CategoriesOptions";

const Templates = () => {
  return (
    <>
      <Typography component="h2" variant="h5">
        Categories
      </Typography>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <CategoriesNav />
        <Box>
          <CategoriesOptions />
          <p style={{ fontSize: 12, color: "gray" }}>
            Rewrite this to one button "Manage"
          </p>
        </Box>
      </Stack>
      <Divider sx={{ margin: "10px 0" }} />
      <Box my={2}>
        <TemplateFilter />
      </Box>
      <TemplatesList />
      <TemplateAdd />
    </>
  );
};

export default Templates;
