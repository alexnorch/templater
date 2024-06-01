import { useState } from "react";
import { Button, Box } from "@mui/material";
import { ITemplateItem } from "../../types";
import { CustomModal, CustomTooltip } from "../ui";
import { useAddTemplateMutation } from "../../api/templateApi";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import TemplateForm from "./TemplateForm";

import AddIcon from "@mui/icons-material/Add";

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
  const disabledText = "First you need to create a category";

  return (
    <>
      <CustomTooltip title={isButtonDisabled && disabledText}>
        <Box>
          <Button
            variant="contained"
            disabled={isButtonDisabled}
            onClick={handleToggleModal}
            endIcon={<AddIcon />}
          >
            Add Template
          </Button>
        </Box>
      </CustomTooltip>

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
