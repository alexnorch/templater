import { useState } from "react";

import BasicModal from "../ui/BasicModal";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TemplateAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add New Template
      </Button>

      <BasicModal isOpen={isModalOpen} handleClose={handleClose}>
        Hello World
      </BasicModal>
    </div>
  );
};

export default TemplateAdd;
