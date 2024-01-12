import { ICategoryItem } from "../../types";

import CategoryForm from "./CategoryForm";
import { useAddCategoryMutation } from "./categoriesApi";

const defaultValues = {
  title: "",
};

const CategoryAdd = () => {
  const [addCategory, state] = useAddCategoryMutation();

  const handleCreateCategory = (data: ICategoryItem) => {
    addCategory(data);
  };

  return (
    <CategoryForm values={defaultValues} onSubmit={handleCreateCategory} />
  );
};

export default CategoryAdd;
