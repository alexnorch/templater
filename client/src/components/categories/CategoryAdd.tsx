import { ICategoryItem } from "../../types";
import { useCreateCategoryMutation } from "../../store/api/categoryApi";

import CategoryForm from "./CategoryForm";

const defaultValues = {
  title: "",
};

const CategoryAdd = () => {
  // const { createCategory } = useCategoryServices();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleCreateCategory = (data: ICategoryItem) => {
    createCategory(data);
  };

  return (
    <CategoryForm values={defaultValues} onSubmit={handleCreateCategory} />
  );
};

export default CategoryAdd;
