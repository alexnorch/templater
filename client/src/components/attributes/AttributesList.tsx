import { Grid } from "@mui/material";
import { useGetAttributesQuery } from "./attributeSlice";
import AttributeItem from "./AttributeItem";

const AttributesList = () => {
  const { data: attributesList, isLoading } = useGetAttributesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const attributesItems = attributesList?.map(
    ({ label, _id: attrId, values }) => (
      <Grid key={attrId} item md={4}>
        <AttributeItem label={label} values={values} attrId={attrId} />
      </Grid>
    )
  );

  return attributesItems;
};

export default AttributesList;
