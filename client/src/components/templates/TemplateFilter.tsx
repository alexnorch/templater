import { useState } from "react";
import {
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { FilterByAttribute, FilterByCategory } from "../filters";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

interface AccordionFilterProps {
  title: string;
  body: React.ReactNode
}

const TemplateFilter: React.FC = () => {
  const [isDrawer, setIsDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => setIsDrawer(newOpen);

  return (
    <>
      <Stack
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'>
        <Button
          sx={{ height: 35 }}
          size="small"
          variant="contained"
          endIcon={<FilterAltIcon />}
          onClick={toggleDrawer(true)}>
          Filter
        </Button>
        <Drawer
          anchor="right"
          open={isDrawer}
          onClose={toggleDrawer(false)}>
          <Box maxWidth={400}>
            <Typography
              textAlign='center'
              m={1}
              variant='h6'>
              Filter options
            </Typography>
            <Divider />
            <Stack spacing={2} p={2}>
              <AccordionFilter
                title="By attributes"
                body={<FilterByAttribute />} />
              <AccordionFilter
                title="By category"
                body={<FilterByCategory />} />
            </Stack>
          </Box>
        </Drawer>
      </Stack>
    </>
  );
};


const AccordionFilter: React.FC<AccordionFilterProps> = ({ title, body }) => {
  return (
    <Accordion defaultExpanded disableGutters sx={{ backgroundColor: "#eee" }}>
      <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
        {title}
      </AccordionSummary >
      <AccordionDetails>
        {body}
      </AccordionDetails>
    </Accordion>
  )
}


export default TemplateFilter;
