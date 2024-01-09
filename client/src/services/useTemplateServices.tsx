import { useDispatch, useSelector } from "react-redux";
import authAxios from "../authAxios";
import { RootState } from "../store";
import { ITemplateItem } from "../types";

// Actions
import {
  initializeTemplates,
  setIsError,
  setIsLoading,
  addTemplate,
  deleteTemplate,
  updateTemplate,
  initializeTemplate,
} from "../store/reducers/templatesSlice";

const _baseURL = "/api/templates";

const useTemplateServices = () => {
  const dispatch = useDispatch();
  const { queryObj, templates } = useSelector(
    (state: RootState) => state.templates
  );

  // Fetching  all templates
  const getAllTemplates = async () => {
    dispatch(setIsLoading(true));

    try {
      const { data } = await authAxios.get(_baseURL, { params: queryObj });

      if (data) {
        dispatch(setIsLoading(false));
        dispatch(initializeTemplates(data));
      }
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };

  // Fetching single template
  const getTemplate = async (id: string) => {
    try {
      const { data } = await authAxios.get(`${_baseURL}/${id}`);

      if (data) {
        dispatch(initializeTemplate(data));
      }
    } catch (error) {
      setIsError(true);
    }
  };

  // Creating template
  const onCreateTemplate = async (body: ITemplateItem) => {
    try {
      const { data } = await authAxios.post(`${_baseURL}`, body);

      if (data) {
        dispatch(addTemplate(data));
      }
    } catch (error) {}
  };

  // Deleting template
  const onDeleteTemplate = async (id: string) => {
    try {
      const { data } = await authAxios.delete(`${_baseURL}/${id}`);
      if (data) {
        dispatch(deleteTemplate(data));
      }
    } catch (error) {}
  };

  // Updating template
  const onUpdateTemplate = async (id: string, template: ITemplateItem) => {
    try {
      const { data } = await authAxios.patch(`${_baseURL}/${id}`, template);

      if (data) {
        dispatch(updateTemplate({ id, template }));
      }
    } catch (error) {}
  };

  const filterTemplates = () => {
    if (!templates) return [];

    let filteredData = templates.slice();

    if (queryObj.category) {
      filteredData = filteredData.filter(
        (template) => queryObj.category === template.category._id
      );
    }

    if (queryObj.gender) {
      filteredData = filteredData.filter(
        (template) => template.gender === queryObj.gender
      );
    }

    if (queryObj.language) {
      filteredData = filteredData.filter(
        (template) => template.language === queryObj.language
      );
    }

    return filteredData;
  };

  return {
    filterTemplates,
    queryObj,
    getAllTemplates,
    getTemplate,
    onCreateTemplate,
    onUpdateTemplate,
    onDeleteTemplate,
  };
};

export default useTemplateServices;
