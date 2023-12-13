import { useState } from "react";

import BasicModal from "../ui/BasicModal";
import { Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
      </BasicModal>
    </>
  );
};

export default TemplateAdd;
