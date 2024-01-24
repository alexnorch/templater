import { useState } from "react";

import { ITemplateItem } from "../../types";

// Internal components
import BasicModal from "../ui/BasicModal";
import AddButton from "../ui/AddButton";
import TemplateForm from "./TemplateForm";

import { useAddTemplateMutation } from "./templateSlice";

const defaultValues = {
  title: "",
  category: "",
  text: "",
  attributeValues: {},
};

const TemplateAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => setIsModalOpen((prev) => !prev);

  const [addTemplate, { isLoading }] = useAddTemplateMutation();

  const onSubmitForm = async (data: ITemplateItem) => {
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
