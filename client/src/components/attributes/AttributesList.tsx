import { Grid, Typography } from "@mui/material";
import { useGetAttributesQuery } from "./attributeSlice";
import AttributeItem from "./AttributeItem";

const AttributesList = () => {
  const {
    data: attributesList,
    isLoading,
    isSuccess,
  } = useGetAttributesQuery();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isSuccess && attributesList.length === 0) {
    return (
      <Typography>
        You don't have any attributes yet. Please create your first attribute
      </Typography>
    );
  }

  const attributeElements = attributesList?.map(({ _id, label, values }) => (
    <Grid item md={4} key={_id}>
      <AttributeItem label={label} attrId={_id} values={values} />
    </Grid>
  ));

  return (
    <Grid container spacing={2} mt={1}>
      {attributeElements}
    </Grid>
  );
};

export default AttributesList;
