import { useState } from "react";
import { ICategoryItem } from "../../types";

import CategoryForm from "./CategoryForm";
import { useAddCategoryMutation } from "./categoriesSlice";

const defaultValues = {
  title: "",
};

// Internal components
import BasicModal from "../ui/BasicModal";
import AddButton from "../ui/AddButton";

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
