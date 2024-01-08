import { useDispatch, useSelector } from "react-redux";
import useAuthAxios from "../hooks/useAuthAxios";
import { RootState } from "../store";
import { ITemplateItem } from "../types";

const useTemplateServices = () => {
  const { queryObj } = useSelector((state: RootState) => state.templates);
  const { authAxios } = useAuthAxios();

  const dispatch = useDispatch();

  // const fetchTemplateById = async () => {
  //   try {
  //     if (selectedTemplateId) {
  //       const { data } = await authAxios.get(
  //         `/api/templates/${selectedTemplateId}`
  //       );

  //       return data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //   Fetching template items
  const fetchTemplates = async () => {
    try {
      const { data } = await authAxios.get("/api/templates", {
        params: queryObj,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Deleting template item
  const deleteTemplate = async (templateId: string | undefined) => {
    try {
      if (templateId) {
        await authAxios.delete(`/api/templates/${templateId}`);
        await fetchTemplates();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Creating template
  const createTemplate = async (data: ITemplateItem) => {
    try {
      const response = await authAxios.post("/api/templates", data);

      if (response.data) {
        await fetchTemplates();
      }
    } catch (error) {}
  };

  // Updating template
  const updateTemplate = async (
    templateId: string | undefined,
    updatedValues: ITemplateItem
  ) => {
    try {
      if (templateId) {
        await authAxios.patch(`/api/templates/${templateId}`, updatedValues);
        await fetchTemplates();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchTemplates,
    deleteTemplate,
    updateTemplate,
    createTemplate,
  };
};

export default useTemplateServices;
