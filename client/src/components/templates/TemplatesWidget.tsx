import { useState } from "react";
import {
  Stack,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CloseIcon from "@mui/icons-material/Close";
import { ScrollContainer } from "../ui";

import { templatesWidgetData } from "../../constants/templateWidgetConstants";

const styles = {
  position: "fixed",
  bottom: 25,
  right: 25,
};

const TemplatesWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Stack
        boxShadow={5}
        onClick={handleOpen}
        alignItems="center"
        justifyContent="center"
        borderRadius={50}
        flexShrink={0}
        width={60}
        height={60}
        sx={{
          backgroundColor: "#3f51b5",
          cursor: "pointer",
          ...styles,
        }}
      >
        <QuestionMarkIcon sx={{ fontSize: 25, color: "#fff" }} />
      </Stack>

      {!!isOpen && (
        <ScrollContainer
          zIndex={999}
          boxShadow={15}
          overflow="auto"
          sx={{ backgroundColor: "#fff", ...styles }}
          borderRadius={2}
          p={3}
          maxHeight={500}
          maxWidth={500}
          width="100%"
          height="100%"
        >
          <Stack
            mb={2}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography color="primary" variant="h6">
              Help Center
            </Typography>
            <IconButton edge="end" onClick={handleOpen}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack spacing={2}>
            {templatesWidgetData.map((el, index) => (
              <Accordion key={index} disableGutters>
                <AccordionSummary
                  sx={{
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                  }}
                  expandIcon={<ArrowDropDownIcon sx={{ color: "#fff" }} />}
                >
                  <Typography variant="body1">{el.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">{el.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </ScrollContainer>
      )}
    </>
  );
};

export default TemplatesWidget;
