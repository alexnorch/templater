import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { RootState } from "../../store";
import { useGetTemplatesQuery } from "./templateSlice";

import TemplateLite from "./TemplateItem";

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

const selectFilterParams = (state: RootState) => state.filter;

const TemplatesList = () => {
  const filterParams = useSelector(selectFilterParams);
  const {
    data: templates,
    isLoading,
    isSuccess,
  } = useGetTemplatesQuery(filterParams);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isSuccess && templates.length === 0) {
    return <Typography>No template was identified or found</Typography>;
  }

  const templateItems = templates?.map((template: any) => (
    <TemplateLite
      key={template._id}
      _id={template._id}
      title={template.title}
      text={template.text}
    />
  ));

  return (
    <Stack sx={boxStyles} spacing={2}>
      {templateItems}
    </Stack>
  );
};

export default TemplatesList;
