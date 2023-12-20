import { Stack } from "@mui/material";

// Components
import TemplateGenderFilter from "./TemplateGenderFilter";
import TemplateSearch from "./TemplateSearch";
import TemplateLangFilter from "./TemplateLangFilter";

const TemplateFilter = () => {
  return (
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
  );
};

export default TemplateFilter;
