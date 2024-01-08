import { useSelector } from "react-redux";

import { Stack } from "@mui/material";
import TemplateItem from "./TemplateItem";
import { RootState } from "../../store";

const TemplatesList = () => {
  const { templates, isLoading } = useSelector(
    (state: RootState) => state.templates
  );

  console.log(isLoading);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (templates.length < 1) {
    return <p>No templates found</p>;
  }

  return (
    <Stack spacing={2}>
      {templates.map((template: any) => (
        <TemplateItem
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
