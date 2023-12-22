import useCategoryServices from "../../hooks/useCategoryServices";
import { ICategoryItem } from "../../types";

import CategoryForm from "./CategoryForm";

const defaultValues = {
  title: "",
};

const CategoryAdd = () => {
  const { createCategory } = useCategoryServices();

  const handleCreateCategory = (data: ICategoryItem) => {
    createCategory(data);
  };

  return (
    <CategoryForm values={defaultValues} onSubmit={handleCreateCategory} />
  );
};

export default CategoryAdd;
