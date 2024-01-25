import { Stack } from "@mui/material";

import AttributeValue from "./AttributeValue";
import AttributeValueAdd from "./AttributeValueAdd";
import { IAttributeValue } from "../../types";

interface AttributeValuesProps {
  values: IAttributeValue[];
}

const AttributeValues: React.FC<AttributeValuesProps> = ({ values }) => {
  const renderedItems = values.map((item) => (
    <AttributeValue
      key={item._id}
      attrId={item.attribute}
      optionId={item._id}
      value={item.value}
    />
  ));

  return (
    <Stack flexDirection="row" gap={2} flexWrap="wrap">
      {renderedItems}
      <AttributeValueAdd />
    </Stack>
  );
};

export default AttributeValues;
