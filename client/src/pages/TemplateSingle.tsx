import { useEffect } from "react";
import { useParams } from "react-router-dom";

import TemplateDetails from "../components/templates/TemplateDetails";
import TemplateDeleting from "../components/templates/TemplateDeleting";
import TemplateEditing from "../components/templates/TemplateEditing";

import useTemplateServices from "../services/useTemplateServices";

const TemplateSingle = () => {
  const { templateId } = useParams();
  const { getTemplate } = useTemplateServices();

  useEffect(() => {
    if (templateId) {
      getTemplate(templateId);
    }
  }, [templateId]);

  return (
    <>
      <TemplateDetails />
      <TemplateDeleting />
      <TemplateEditing />
    </>
  );
};

export default TemplateSingle;
