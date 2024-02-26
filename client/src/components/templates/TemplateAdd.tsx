import { useState } from "react";

import { ITemplateItem } from "../../types";

// Internal components
import CustomModal from "../ui/CustomModal";
import AddButton from "../ui/AddButton";
import TemplateForm from "./TemplateForm";

import { useAddTemplateMutation } from "../../api/templateApi";

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

      <CustomModal
        title="Create Template"
        isOpen={isModalOpen}
        handleClose={handleToggleModal}
        sx={{ maxWidth: 800, width: { xs: "90%", sx: "100%" } }}
      >
        <TemplateForm
          mode="create"
          onSubmit={handleSubmitForm}
          values={defaultValues}
          isLoading={isLoading}
        />
      </CustomModal>
    </>
  );
};

export default TemplateAdd;
