import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import TemplateFilter from "../components/templates/TemplateFilter";
import TemplatesList from "../components/templates/TemplatesList";
import TemplateAdd from "../components/templates/TemplateAdd";
import useTemplateServices from "../hooks/useTemplateServices";
import useCategoryServices from "../hooks/useCategoryServices";

const Templates = () => {
  const { queryObj } = useSelector((state: RootState) => state.template);
  const { category, gender, language, title } = queryObj;

  const { fetchTemplates } = useTemplateServices();
  const { fetchCategories } = useCategoryServices();

  useEffect(() => {
    fetchTemplates();
  }, [category, gender, language, title]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <TemplateFilter />
      <TemplatesList />
      <TemplateAdd />
    </>
  );
};

export default Templates;
