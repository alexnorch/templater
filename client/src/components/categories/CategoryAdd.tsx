import { useState } from "react";
import CategoryForm from "./CategoryForm";
import { useAddCategoryMutation } from "../../api/categoryApi";
import { ICategoryItem } from "../../types";
import { CustomModal, AddButton } from "../ui";

const defaultValues = { title: "" };

const CategoryAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const handleToggleModal = () => setIsModalOpen((prev) => !prev);

  const onSubmitForm = async (data: ICategoryItem) => {
    await addCategory(data).unwrap();
    handleToggleModal();
  };

  return (
    <>
      <AddButton onClick={handleToggleModal} />

      <CustomModal
        title="Create Category"
        isOpen={isModalOpen}
        handleClose={handleToggleModal}
        sx={{ maxWidth: "400px" }}
      >
        <CategoryForm
          onSubmit={onSubmitForm}
          values={defaultValues}
          isLoading={isLoading}
        />
      </CustomModal>
    </>
  );
};

export default CategoryAdd;
