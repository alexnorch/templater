import { useSelector } from "react-redux";
import { Stack, Typography, LinearProgress, Box } from "@mui/material";
import { useGetTemplatesQuery } from "../../api/templateApi";

import { styled } from "@mui/system";
import { selectFilterParams } from "../../store/slices/filterSlice";
import { TemplateItem, TemplatesListSkeleton } from "../templates";
import { IAttributeValue, ITemplateItem } from "../../types";

const TemplatesContainer = styled(Stack)({
  overflowY: "scroll",
  paddingRight: 18,
  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: "none",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "none",
  },
  "&:hover::-webkit-scrollbar-track": {
    background: "#ddd",
    borderRadius: '10px'
  },
  "&:hover::-webkit-scrollbar-thumb": {
    background: "#1976d2",
    borderRadius: '10px'
  }
});

const TemplatesList = () => {
  const filterParams = useSelector(selectFilterParams);
  const {
    data: templates = [],
    isLoading,
    isSuccess,
    isFetching,
  } = useGetTemplatesQuery(filterParams);

  if (isSuccess && templates.length === 0) {
    return <Typography>No template was identified or found</Typography>;
  }

  const templateItems = templates.map((template: ITemplateItem) => (
    <TemplateItem
      key={template._id}
      category={template.category}
      _id={template._id}
      text={template.text}
      title={template.title}
      attributeValues={template.attributeValues as IAttributeValue[]} />
  ));

  return (
    <TemplatesContainer spacing={2} sx={{ height: { sm: "55vh", xs: "40vh" } }}>
      {!isLoading && isFetching && (
        <Box>
          <LinearProgress />
        </Box>
      )}
      {isLoading && <TemplatesListSkeleton />}
      {templateItems}
    </TemplatesContainer>
  );
};

export default TemplatesList;
