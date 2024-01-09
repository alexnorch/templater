import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { initializeCategories } from "../store/reducers/categoriesSlice";
import authAxios from "../authAxios";

const _baseURL = "/api/categories";

const categoriesSelector = (state: RootState) => state.categories;

const useCategoriesServices = () => {
  const { data: categoriesList } = useSelector(categoriesSelector);

  const dispatch = useDispatch();

  const getAllCategories = async () => {
    try {
      const { data } = await authAxios.get(_baseURL);

      if (data) {
        dispatch(initializeCategories(data));
      }
    } catch (error) {}
  };
  const onCreateCategory = async () => {};
  const onDeleteCategory = async () => {};
  const onUpdateCategory = async () => {};

  return {
    categoriesList,
    getAllCategories,
    onCreateCategory,
    onDeleteCategory,
    onUpdateCategory,
  };
};

export default useCategoriesServices;
