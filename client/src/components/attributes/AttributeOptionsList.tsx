import { Stack, Chip } from "@mui/material";
import { IAttributeOption } from "../../types";

interface IAttributeOptionsList {
  data: IAttributeOption[]
}

const AttributeOptionsList: React.FC<IAttributeOptionsList> = ({ data = [] }) => {

  const renderedItems = data.map(({ _id, value }) => (
    <Chip label={value} key={_id} />
  ))

  return (
    <Stack flexDirection="row" gap={2} flexWrap="wrap">
      {renderedItems}
    </Stack>
  );
};

export default AttributeOptionsList;

