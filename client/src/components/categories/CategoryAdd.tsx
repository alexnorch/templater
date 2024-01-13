import { useState } from "react";
import { Fab } from "@mui/material";
import { ICategoryItem } from "../../types";

import CategoryForm from "./CategoryForm";
import { useAddCategoryMutation } from "./categoriesApi";

const defaultValues = {
  title: "",
};

// Internal components
import BasicModal from "../ui/BasicModal";

// Icons
import AddIcon from "@mui/icons-material/Add";

const CategoryAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCategory, state] = useAddCategoryMutation();

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const fabStyles = { position: "fixed", bottom: 25, right: 25 };

  const onSubmitForm = (data: ICategoryItem) => {
    addCategory(data);
    handleClose();
  };

  return (
    <>
      <Fab onClick={handleOpen} sx={fabStyles} color="primary">
        <AddIcon />
      </Fab>

      <BasicModal isOpen={isModalOpen} handleClose={handleClose}>
        <CategoryForm onSubmit={onSubmitForm} values={defaultValues} />
      </BasicModal>
    </>
  );
};

export default CategoryAdd;
