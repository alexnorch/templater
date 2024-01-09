import { useState } from "react";

import { Fab } from "@mui/material";
import { ITemplateItem } from "../../types";
import useTemplateServices from "../../services/useTemplateServices";

// Internal components
import BasicModal from "../ui/BasicModal";
import TemplateForm from "./TemplateForm";

// Icons
import AddIcon from "@mui/icons-material/Add";

const defaultValues = {
  title: "",
  category: "",
  language: "",
  gender: "",
  text: "",
};

const TemplateAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onCreateTemplate } = useTemplateServices();

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const fabStyles = { position: "fixed", bottom: 25, right: 25 };

  const onSubmitForm = (data: ITemplateItem) => {
    onCreateTemplate(data);
    handleClose();
  };

  return (
    <>
      <Fab onClick={handleOpen} sx={fabStyles} color="primary">
        <AddIcon />
      </Fab>

      <BasicModal isOpen={isModalOpen} handleClose={handleClose}>
        <TemplateForm
          heading="Create template"
          onSubmit={onSubmitForm}
          values={defaultValues}
        />
      </BasicModal>
    </>
  );
};

export default TemplateAdd;
