import { useState } from "react";

import BasicModal from "../ui/BasicModal";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TemplateForm from "./TemplateForm";
import useAuthAxios from "../../hooks/useAuthAxios";
import useAlert from "../../hooks/useAlert";

interface IFormInputs {
  title: string;
  category: string;
  language: string;
  gender: string;
  text: string;
}

const defaultValues = {
  title: "",
  category: "",
  language: "",
  gender: "",
  text: "",
};

const TemplateAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authAxios } = useAuthAxios();
  const { showSuccessAlert } = useAlert();

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const fabStyles = { position: "fixed", bottom: 25, right: 25 };

  const onCreateTemplate = async (data: IFormInputs) => {
    try {
      const response = await authAxios.post("/api/templates", data);

      if (response.data) {
        showSuccessAlert("Template was successfully added");
        handleClose();
      }
    } catch (error) {}
  };

  return (
    <>
      <Fab onClick={handleOpen} sx={fabStyles} color="primary">
        <AddIcon />
      </Fab>

      <BasicModal isOpen={isModalOpen} handleClose={handleClose}>
        <TemplateForm
          heading="Create template"
          onSubmit={onCreateTemplate}
          values={defaultValues}
        />
      </BasicModal>
    </>
  );
};

export default TemplateAdd;
