import { Box, Stack, Divider } from "@mui/material";

// Filter components
import TemplateCategoryFilter from "./TemplateCategoryFilter";
import TemplateGenderFilter from "./TemplateGenderFilter";
import TemplateSearch from "./TemplateSearch";
import TemplateLangFilter from "./TemplateLangFilter";

const TemplateFilter = () => {
  return (
    <Box mb={3}>
      <TemplateCategoryFilter />
      <Divider sx={{ margin: "15px 0" }} />
      <Stack
        spacing={5}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <TemplateSearch />
        <TemplateGenderFilter />
        <TemplateLangFilter />
      </Stack>
    </Box>
  );
};

export default TemplateFilter;
