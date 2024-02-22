import { useState } from "react";
import { Stack, Typography, Button, IconButton } from "@mui/material";
import { IAttributeValue } from "../../types";
import AttributeValues from "./AttributeValues";
import ConfirmDialog from "../ui/ConfirmDialog";

import DeleteIcon from "@mui/icons-material/Delete";

import { useDeleteAttributeMutation } from "../../api/attributeApi";

interface AttributeItemProps {
  label: string;
  attrId: string;
  values: IAttributeValue[];
}

const AttributeItem: React.FC<AttributeItemProps> = ({
  attrId,
  label,
  values,
}) => {
  const [shouldDelete, setShouldDelete] = useState(false);
  const [deleteAttribute] = useDeleteAttributeMutation();

  const onDeleteAttribute = async () => await deleteAttribute(attrId);
  const toggleShouldDelete = () => setShouldDelete((prev) => !prev);

  return (
    <>
      <Stack
        sx={{ backgroundColor: "white", padding: 2, borderRadius: 1 }}
        key={attrId}
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography mb={1} component="h4" variant="h6">
            {label}
          </Typography>
          <IconButton onClick={toggleShouldDelete}>
            <DeleteIcon />
          </IconButton>
        </Stack>
        <AttributeValues attrId={attrId} values={values} />
      </Stack>

      {/* Attribute Deleting */}
      <ConfirmDialog
        isOpen={shouldDelete}
        handleClose={toggleShouldDelete}
        handleSubmit={onDeleteAttribute}
        title="Delete Attribute"
        text="Are you sure you want to delete this attribute?"
      />
    </>
  );
};

export default AttributeItem;
