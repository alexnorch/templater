import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Stack } from "@mui/material";
import { useGetTemplatesQuery } from "./templateSlice";

import TemplateLite from "./TemplateLite";

const selectQueryObj = (state: RootState) => state.templates.queryObj;

const TemplatesList = () => {
  const queryParams = useSelector(selectQueryObj);
  const {
    data: templates,
    isLoading,
    isSuccess,
  } = useGetTemplatesQuery(queryParams);

  const getContent = () => {
    if (isLoading) {
      return "Loading...";
    }

    if (isSuccess) {
      if (templates.length === 0) {
        return "There is no template";
      }

      return templates.map((template: any) => (
        <TemplateLite
          key={template._id}
          category={template.category}
          _id={template._id}
          title={template.title}
          text={template.text}
          language={template.language}
          gender={template.gender}
        />
      ));
    }

    return "Error loading templates";
  };

  const content = getContent();

  const boxStyles = {
    maxHeight: "65vh",
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
    <Stack sx={boxStyles} spacing={2}>
      {content}
    </Stack>
  );
};

export default TemplatesList;
