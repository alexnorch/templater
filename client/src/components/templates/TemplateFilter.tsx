import {
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { FilterByAttribute, FilterByTitle, FilterByCategory } from "../filters";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const TemplateFilter = () => {
  return (
    <Accordion
      square
      sx={{
        my: 3,
        backgroundColor: "#eee",
      }}
    >
      <AccordionSummary>
        Filtering Templates
        <KeyboardArrowDownIcon />
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <FilterByTitle />
          <FilterByCategory />
          <FilterByAttribute />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default TemplateFilter;
