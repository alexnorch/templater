import useAuthAxios from "../hooks/useAuthAxios";

const useCategoryServices = () => {
  const { authAxios } = useAuthAxios();

  const getCategories = () => {};
  const deleteCategory = () => {};
  const updateCategory = () => {};
  const createCategory = () => {};

  return {
    getCategories,
    deleteCategory,
    updateCategory,
    createCategory,
  };
};

export default useCategoryServices;
