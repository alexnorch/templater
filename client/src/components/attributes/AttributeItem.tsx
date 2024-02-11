import { useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import { IAttributeValue } from "../../types";
import AttributeValues from "./AttributeValues";
import ConfirmDialog from "../ui/ConfirmDialog";

import { useDeleteAttributeMutation } from "./attributeApi";

interface AttributeItemProps {
  label: string;
  attrId: string;
  values: IAttributeValue[];
}

const AttributeItem: React.FC<AttributeItemProps> = (props) => {
  const { attrId, label, values } = props;

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteAttribute] = useDeleteAttributeMutation();

  const onDeleteAttribute = async () => {
    await deleteAttribute(attrId);
  };

  const handleToggleDeleting = () => setIsDeleting((prev) => !prev);

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
          <Button onClick={handleToggleDeleting}>Delete</Button>
        </Stack>
        <AttributeValues attrId={attrId} values={values} />
      </Stack>

      {/* Attribute Deleting */}
      <ConfirmDialog
        isOpen={isDeleting}
        handleClose={handleToggleDeleting}
        handleSubmit={onDeleteAttribute}
        title="Delete Attribute"
        text="Are you sure you want to delete this attribute?"
      />
    </>
  );
};

export default AttributeItem;
