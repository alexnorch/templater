import { useState } from "react";

import BasicModal from "../ui/BasicModal";
import { Fab, Typography, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TemplateForm from "./TemplateForm";

const TemplateAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <Fab
        onClick={handleOpen}
        sx={{ position: "fixed", bottom: 40, right: 40 }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>

      <BasicModal isOpen={isModalOpen} handleClose={handleClose}>
        <Typography component="h5" variant="h6">
          Create template
        </Typography>
        <TemplateForm />
        <Stack alignItems="flex-end">
          <Button variant="contained">Submit</Button>
        </Stack>
      </BasicModal>
    </>
  );
};

export default TemplateAdd;
