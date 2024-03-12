import { Grid, Typography } from "@mui/material";
import { useGetAttributesQuery } from "../../api/attributeApi";
import { Attribute } from ".";

const AttributesList: React.FC = () => {
  const {
    data: attributesList = [],
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

  const attributeElements = attributesList.map(({ _id, label, values }) => (
    <Grid item md={4} sm={6} xs={12} key={_id}>
      <Attribute
        _id={_id}
        label={label}
        values={values} />
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      {attributeElements}
    </Grid>
  );
};

export default AttributesList;
