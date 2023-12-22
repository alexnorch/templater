import { useDispatch } from "react-redux";
import { initCategories } from "../store/reducers/categoryReducer";
import useAuthAxios from "../hooks/useAuthAxios";
import { ICategoryItem } from "../types";

const useCategoryServices = () => {
  const { authAxios } = useAuthAxios();
  const dispatch = useDispatch();

  // Fetching all categories
  const fetchCategories = async () => {
    try {
      const { data } = await authAxios.get("/api/categories");

      if (data) {
        dispatch(initCategories(data));
      }
    } catch (error) {}
  };

  // Creating new category
  const createCategory = async (data: ICategoryItem) => {
    try {
      const response = await authAxios.post("/api/categories/", data);

      if (response.data) {
        fetchCategories();
      }
    } catch (error) {}
  };

  // Deleting category
  const deleteCategory = async (categoryId: string | undefined) => {
    try {
      const { data } = await authAxios.delete(`/api/categories/${categoryId}`);

      if (data) {
        fetchCategories();
      }
    } catch (error) {}
  };

  // Updating category
  const updateCategory = async () => {};

  return {
    fetchCategories,
    deleteCategory,
    updateCategory,
    createCategory,
  };
};

export default useCategoryServices;
