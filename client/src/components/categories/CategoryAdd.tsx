import { useState } from "react";
import CategoryForm from "./CategoryForm";
import { useAddCategoryMutation } from "../../api/categoryApi";
import { ICategoryItem } from "../../types";
import { BasicModal, AddButton } from "../ui";

const defaultValues = { title: "" };

const CategoryAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCategory] = useAddCategoryMutation();

  const handleToggleModal = () => setIsModalOpen((prev) => !prev);

  const onSubmitForm = (data: ICategoryItem) => {
    addCategory(data);
    handleToggleModal();
  };

  return (
    <>
      <AddButton onClick={handleToggleModal} />

      <BasicModal
        title="Create Category"
        isOpen={isModalOpen}
        handleClose={handleToggleModal}
      >
        <CategoryForm onSubmit={onSubmitForm} values={defaultValues} />
      </BasicModal>
    </>
  );
};

export default CategoryAdd;
