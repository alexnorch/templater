import { useSelector } from "react-redux";
import { Typography, LinearProgress, Box } from "@mui/material";
import { useGetTemplatesQuery } from "../../api/templateApi";

import { selectFilterParams } from "../../store/slices/filterSlice";
import { TemplateItem, TemplatesListSkeleton } from "../templates";
import { IAttributeOption, ITemplateItem } from "../../types";
import { ScrollContainer } from "../ui";

const TemplatesList: React.FC = () => {
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

  const templateItems = templates.map(({
    _id, category, text, title, attributeValues
  }: ITemplateItem) => (
    <TemplateItem
      key={_id}
      category={category}
      _id={_id}
      text={text}
      title={title}
      attributeValues={attributeValues as IAttributeOption[]} />
  ));

  return (
    <ScrollContainer spacing={2} height='100%'>
      {!isLoading && isFetching && (
        <Box>
          <LinearProgress />
        </Box>
      )}

      {isLoading && <TemplatesListSkeleton />}
      {templateItems}
    </ScrollContainer>
  );
};

export default TemplatesList;
