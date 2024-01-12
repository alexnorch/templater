import { Stack } from "@mui/material";
import { useGetTemplatesQuery } from "./templateApi";

import Template from "./Template";

const TemplatesList = () => {
  const { data: templates, isLoading } = useGetTemplatesQuery(undefined);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const templatesItems = templates!.map((template: any) => (
    <Template
      key={template._id}
      category={template.category.title}
      _id={template._id}
      title={template.title}
      text={template.text}
      language={template.language}
      gender={template.gender}
    />
  ));

  const templateContainerStyles = {
    maxHeight: "60vh",
    overflowY: "scroll",
    paddingRight: 2,
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#gray",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#1976d2",
    },
  };

  return (
    <Stack sx={templateContainerStyles} spacing={2}>
      {templatesItems}
    </Stack>
  );
};

export default TemplatesList;
