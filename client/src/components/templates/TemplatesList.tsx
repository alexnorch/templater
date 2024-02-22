import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { useGetTemplatesQuery } from "../../api/templateApi";

import TemplateLite from "./TemplateItem";
import { ITemplateLite } from "../../types";

import { styled } from "@mui/system";
import { selectFilterParams } from "../filters/filterSlice";

const TemplatesContainer = styled(Stack)({
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
});

const TemplatesList = () => {
  const filterParams = useSelector(selectFilterParams);
  const {
    data: templates = [],
    isLoading,
    isSuccess,
  } = useGetTemplatesQuery(filterParams);

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isSuccess && templates.length === 0) {
    return <Typography>No template was identified or found</Typography>;
  }

  const templateItems = templates.map(({ _id, title }: any) => (
    <TemplateLite key={_id} _id={_id} title={title} />
  ));

  return <TemplatesContainer spacing={2}>{templateItems}</TemplatesContainer>;
};

export default TemplatesList;
