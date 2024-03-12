import { useState } from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import { IAttribute } from "../../types";
import { AttributeOptionsList } from ".";
import ConfirmDialog from "../ui/ConfirmDialog";

import DeleteIcon from "@mui/icons-material/Delete";

import { useDeleteAttributeMutation } from "../../api/attributeApi";

const Attribute: React.FC<IAttribute> = ({
  _id,
  label,
  values,
}) => {
  const [shouldDelete, setShouldDelete] = useState(false);
  const [deleteAttribute] = useDeleteAttributeMutation();

  const onDeleteAttribute = async () => await deleteAttribute(_id);
  const toggleShouldDelete = () => setShouldDelete((prev) => !prev);

  return (
    <>
      <Stack
        sx={{ backgroundColor: "white", padding: 2, borderRadius: 1 }}
        key={_id}
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography mb={1} component="h4" variant="h6">
            {label}
          </Typography>
          <IconButton onClick={toggleShouldDelete}>
            <DeleteIcon />
          </IconButton>
        </Stack>
        <AttributeOptionsList
          attributeId={_id}
          values={values}
        />
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

export default Attribute;
