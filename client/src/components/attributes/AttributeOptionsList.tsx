import { Stack } from "@mui/material";
import { AttributeOption, AttributeOptionAdd } from "../attributes";
import { IAttributeOption } from "../../types";

interface IAttributeOptionsList {
  values: IAttributeOption[];
  attributeId: string;
}

const AttributeOptionsList: React.FC<IAttributeOptionsList> = ({
  values,
  attributeId,
}) => {


  const renderedItems = values.map((item) => (
    <AttributeOption
      key={item._id}
      attributeId={item.attribute as string}
      optionId={item._id}
      value={item.value}
    />
  ));

  return (
    <Stack flexDirection="row" gap={2} flexWrap="wrap">
      {renderedItems}
      <AttributeOptionAdd attributeId={attributeId} />
    </Stack>
  );
};

export default AttributeOptionsList;


/*

1. Attribute
2. AttributeOption


1. AttributesList
2. AttributeForm
3. AttributeAdd
4. AttributeSelect

5. AttributeOptionsList
6. AttributeOption
7. AttributeOptionForm
8. AttributeOptionAdd
9.

*/