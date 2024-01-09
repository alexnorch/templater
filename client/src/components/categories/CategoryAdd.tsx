import { ICategoryItem } from "../../types";

import CategoryForm from "./CategoryForm";

const defaultValues = {
  title: "",
};

const CategoryAdd = () => {
  // const { createCategory } = useCategoryServices();

  const handleCreateCategory = (data: ICategoryItem) => {
    console.log("Created");
  };

  return (
    <CategoryForm values={defaultValues} onSubmit={handleCreateCategory} />
  );
};

export default CategoryAdd;
