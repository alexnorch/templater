import { useSelector } from "react-redux";
import { Stack, Typography, LinearProgress, Box } from "@mui/material";
import { useGetTemplatesQuery } from "../../api/templateApi";

import { styled } from "@mui/system";
import { selectFilterParams } from "../filters/filterSlice";
import { TemplateItem, TemplatesListSkeleton } from "../templates";

const TemplatesContainer = styled(Stack)({
  overflowY: "scroll",
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
    isFetching,
  } = useGetTemplatesQuery(filterParams);

  if (isSuccess && templates.length === 0) {
    return <Typography>No template was identified or found</Typography>;
  }

  const templateItems = templates.map((item: any) => (
    <TemplateItem key={item._id} _id={item._id} title={item.title} />
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
