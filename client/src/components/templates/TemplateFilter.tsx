import { Box, Stack, Divider } from "@mui/material";

// Filter components
import CategoryFilter from "../filters/CategoryFilter";
import GenderFilter from "../filters/GenderFilter";
import SearchInput from "../filters/SearchInput";
import LanguageFilter from "../filters/LanguageFilter";

const TemplateFilter = () => {
  return (
    <Box my={3}>
      <Stack
        spacing={5}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <SearchInput />
        <GenderFilter />
        <LanguageFilter />
      </Stack>
      <CategoryFilter />
      <Divider sx={{ margin: "15px 0" }} />
    </Box>
  );
};

export default TemplateFilter;
