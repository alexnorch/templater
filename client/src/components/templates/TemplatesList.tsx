import { Stack } from "@mui/material";

import Template from "./Template";
import useTemplateServices from "../../services/useTemplateServices";

const TemplatesList = () => {
  const { filterTemplates } = useTemplateServices();

  const filteredTemplates = filterTemplates();

  if (filteredTemplates.length === 0) {
    return "Templates no found";
  }

  return (
    <Stack spacing={2}>
      {filteredTemplates.map((template: any) => (
        <Template
          key={template._id}
          category={template.category.title}
          _id={template._id}
          title={template.title}
          text={template.text}
          language={template.language}
          gender={template.gender}
        />
      ))}
    </Stack>
  );
};

export default TemplatesList;
