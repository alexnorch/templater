import { useState } from "react";
import { Tooltip } from "@mui/material";
import { ITemplateItem } from "../../types";
import { CustomModal, AddButton } from "../ui";
import { useAddTemplateMutation } from "../../api/templateApi";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import TemplateForm from "./TemplateForm";

const defaultValues = {
  title: "",
  category: "",
  text: "",
  attributeValues: {},
};

const TemplateAdd: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addTemplate, { isLoading }] = useAddTemplateMutation();
  const { data: categories = [] } = useGetCategoriesQuery();

  const handleToggleModal = () => setIsModalOpen((prev) => !prev);

  const handleSubmitForm = async (data: ITemplateItem) => {
    await addTemplate(data).unwrap();
    handleToggleModal();
  };

  const isButtonDisabled = categories.length === 0;

  return (
    <>
      <AddButton
        tooltipText="Before creating a template, it's necessary to first create a category. Go to settings."
        disabled={isButtonDisabled}
        onClick={handleToggleModal}
      />

      <CustomModal
        title="Create Template"
        isOpen={isModalOpen}
        handleClose={handleToggleModal}
        sx={{ maxWidth: 800, width: { xs: "90%", sx: "100%", }, p: 0 }}
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
