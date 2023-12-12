import { useState } from "react";

import BasicModal from "../ui/BasicModal";
import { Button } from "@mui/material";

const CategoryAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Add New Template
      </Button>

      <BasicModal isOpen={isModalOpen} handleClose={handleClose}>
        Hello World
      </BasicModal>
    </div>
  );
};

export default CategoryAdd;
