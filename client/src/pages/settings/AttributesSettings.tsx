import { Typography } from "@mui/material";
import { AttributeAdd, AttributesList } from "../../components/attributes";

const AttributesSettings = () => {
  return (
    <>
      <Typography variant="h5" mb={2}>
        My Attributes
      </Typography>
      <AttributesList />
      <AttributeAdd />
    </>
  );
};

export default AttributesSettings;
