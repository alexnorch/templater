import { useDispatch, useSelector } from "react-redux";
import { initTemplates } from "../store/reducers/templateReducer";
import useAuthAxios from "../hooks/useAuthAxios";
import { RootState } from "../store";
import { ITemplateItem } from "../types";

const useTemplateServices = () => {
  const { queryObj } = useSelector((state: RootState) => state.template);
  const { authAxios } = useAuthAxios();

  const dispatch = useDispatch();

  //   Fetching template items
  const fetchTemplates = async () => {
    try {
      const { data } = await authAxios.get("/api/templates", {
        params: queryObj,
      });

      dispatch(initTemplates(data));
    } catch (error) {
      console.log(error);
    }
  };

  //   Deleting template item
  const deleteTemplate = async (templateId: string | undefined) => {
    try {
      await authAxios.delete(`/api/templates/${templateId}`);
      await fetchTemplates();
    } catch (error) {
      console.log(error);
    }
  };

  //   Creating template
  const createTemplate = async (data: ITemplateItem) => {
    try {
      const response = await authAxios.post("/api/templates", data);

      if (response.data) {
        await fetchTemplates();
      }
    } catch (error) {}
  };

  const updateTemplate = () => {};

  return {
    fetchTemplates,
    deleteTemplate,
    updateTemplate,
    createTemplate,
  };
};

export default useTemplateServices;
