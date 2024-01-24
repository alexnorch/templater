import { Stack, Typography, Button, Chip } from "@mui/material";
import { IAttributeValue } from "../../types";
import AddIcon from "@mui/icons-material/Add";

import {
  useAddAttributeOptionMutation,
  useDeleteAttributeOptionMutation,
  useDeleteAttributeMutation,
} from "../../components/attributes/attributeSlice";

interface IAttributeItem {
  label: string;
  attrId: string;
  values: IAttributeValue[];
}

const AttributeItem: React.FC<IAttributeItem> = ({ attrId, label, values }) => {
  const [deleteAttributeOption] = useDeleteAttributeOptionMutation();
  const [deleteAttribute] = useDeleteAttributeMutation();
  const [addAttributeOption] = useAddAttributeOptionMutation();

  const onAddOptionAttribute = async (_id: string) => {
    const value = prompt("Please provide an option attribute name");

    if (value) {
      await addAttributeOption({ _id, value }).unwrap();
    }
  };

  const onDeleteOptionAttribute = async (attrId: string, optionId: string) => {
    await deleteAttributeOption({ attrId, optionId });
  };

  const onDeleteAttribute = async (attrId: string) => {
    await deleteAttribute(attrId);
  };

  const renderedAttributeValues = values.map(({ value, _id: optionId }) => (
    <Chip
      key={optionId}
      label={value}
      onDelete={() => onDeleteOptionAttribute(attrId, optionId)}
    />
  ));

  return (
    <Stack
      sx={{ backgroundColor: "white", padding: 2, borderRadius: 3 }}
      key={attrId}
    >
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography mb={1} component="h4" variant="h6">
          {label}
        </Typography>
        <Button onClick={() => onDeleteAttribute(attrId)}>Delete</Button>
      </Stack>

      <Stack flexDirection="row" gap={2} flexWrap="wrap">
        {renderedAttributeValues}
        <Chip
          icon={<AddIcon />}
          label="Add"
          onClick={() => onAddOptionAttribute(attrId)}
        />
      </Stack>
    </Stack>
  );
};

export default AttributeItem;
