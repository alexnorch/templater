import { Stack, Divider } from "@mui/material";
import { TemplateAdd, TemplateSearch } from ".";
import {
  FilterByCategory,
  FilterByAttribute,
  FilterByAttributeValue,
} from "../filters";

const TemplateNavbar: React.FC = () => {
  return (
    <Stack>
      <Stack width={1} flexDirection={{ sm: "row" }} gap={1}>
        <TemplateSearch />
        <Divider orientation="vertical" />
        <FilterByCategory />
        <Divider orientation="vertical" />
        <FilterByAttribute />
        <Stack marginLeft="auto">
          <TemplateAdd />
        </Stack>
      </Stack>
      <Divider sx={{ mt: 1 }} />
      <Stack mt={1}>
        <FilterByAttributeValue />
      </Stack>
    </Stack>
  );
};
export default TemplateNavbar;
