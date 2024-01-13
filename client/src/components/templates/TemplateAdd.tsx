import { useState } from "react";

import { Fab } from "@mui/material";
import { ITemplateItem } from "../../types";

// Internal components
import BasicModal from "../ui/BasicModal";
import TemplateForm from "./TemplateForm";

// Icons
import AddIcon from "@mui/icons-material/Add";

import { useAddTemplateMutation } from "./templateSlice";

const defaultValues = {
  title: "",
  category: "",
  language: "",
  gender: "",
  text: "",
};

const TemplateAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const fabStyles = { position: "fixed", bottom: 25, right: 25 };

  const [addTemplate, { isLoading }] = useAddTemplateMutation();

  const onSubmitForm = (data: ITemplateItem) => {
    addTemplate(data);
    handleClose();
  };

  return (
    <>
      <Fab onClick={handleOpen} sx={fabStyles} color="primary">
        <AddIcon />
      </Fab>

      <BasicModal isOpen={isModalOpen} handleClose={handleClose}>
        <TemplateForm
          onSubmit={onSubmitForm}
          values={defaultValues}
          isLoading={isLoading}
        />
      </BasicModal>
    </>
  );
};

export default TemplateAdd;
