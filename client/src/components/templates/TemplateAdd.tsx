import { useState } from "react";

import BasicModal from "../ui/BasicModal";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TemplateForm from "./TemplateForm";

interface IFormInputs {
  title: string;
  category: string;
  language: string;
  gender: string;
  text: string;
}

const TemplateAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const fabStyles = { position: "fixed", bottom: 40, right: 40 };

  const onCreateTemplate = (data: IFormInputs) => {
    console.log(data);
  };

  return (
    <>
      <Fab onClick={handleOpen} sx={fabStyles} color="primary">
        <AddIcon />
      </Fab>

      <BasicModal isOpen={isModalOpen} handleClose={handleClose}>
        <TemplateForm heading="Create template" onSubmit={onCreateTemplate} />
      </BasicModal>
    </>
  );
};

export default TemplateAdd;
