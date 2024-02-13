import { useState } from "react";
import { Box } from "@mui/material";

import { ITemplateItem } from "../../types";

// Internal components
import BasicModal from "../ui/CustomModal";
import AddButton from "../ui/AddButton";
import TemplateForm from "./TemplateForm";

import { useAddTemplateMutation } from "./templateApi";

const defaultValues = {
  title: "",
  category: "",
  text: "",
  attributeValues: {},
};

const TemplateAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addTemplate, { isLoading }] = useAddTemplateMutation();
  const handleToggleModal = () => setIsModalOpen((prev) => !prev);

  const handleSubmitForm = async (data: ITemplateItem) => {
    await addTemplate(data).unwrap();
    handleToggleModal();
  };

  return (
    <>
      <AddButton onClick={handleToggleModal} />

      <BasicModal
        title="Create Template"
        isOpen={isModalOpen}
        handleClose={handleToggleModal}
      >
        <Box minWidth={600}>
          <TemplateForm
            mode="create"
            onSubmit={handleSubmitForm}
            values={defaultValues}
            isLoading={isLoading}
          />
        </Box>
      </BasicModal>
    </>
  );
};

export default TemplateAdd;
