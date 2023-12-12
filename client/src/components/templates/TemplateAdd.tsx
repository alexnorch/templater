import { useState } from "react";

import BasicModal from "../ui/BasicModal";
import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TemplateAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div>
      <Fab
        sx={{ position: "fixed", bottom: 40, right: 40 }}
        onClick={handleOpen}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>

      <BasicModal isOpen={isModalOpen} handleClose={handleClose}>
        Hello World
      </BasicModal>
    </div>
  );
};

export default TemplateAdd;
