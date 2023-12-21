import { Box, Stack, Divider } from "@mui/material";

// Filter components
import TemplateCategoryFilter from "./TemplateCategoryFilter";
import TemplateGenderFilter from "./TemplateGenderFilter";
import TemplateSearch from "./TemplateSearch";
import TemplateLangFilter from "./TemplateLangFilter";

const TemplateFilter = () => {
  return (
    <Box my={3}>
      <Stack
        spacing={5}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <TemplateSearch />
        <TemplateGenderFilter />
        <TemplateLangFilter />
      </Stack>
      <TemplateCategoryFilter />
      <Divider sx={{ margin: "15px 0" }} />
    </Box>
  );
};

export default TemplateFilter;
