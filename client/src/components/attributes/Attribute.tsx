import { useState } from "react";
import { IconButton, Card, CardHeader, Menu, MenuItem, CardContent } from "@mui/material";
import { AttributeForm, AttributeOptionsList } from ".";
import type { IAttribute, IAttributeOption } from "../../types";
import { ConfirmDialog, CustomModal } from "../ui";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useDeleteAttributeMutation, useUpdateAttributeMutation } from "../../api/attributeApi";

const Attribute: React.FC<IAttribute> = ({
  _id,
  label,
  values,
}) => {
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldEdit, setShouldEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const [deleteAttribute] = useDeleteAttributeMutation();
  const [updateAttribute] = useUpdateAttributeMutation();

  const toggleShouldDelete = () => setShouldDelete((prev) => !prev);
  const toggleShouldEdit = () => setShouldEdit((prev) => !prev);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleStartEditing = () => {
    toggleShouldEdit()
    handleMenuClose()
  }

  const handleStartDeleting = () => {
    toggleShouldDelete()
    handleMenuClose();
  }

  const handleUpdateAttribute = async (data: any) => {
    await updateAttribute({ _id, data }).unwrap();
    toggleShouldEdit()
  }

  const handleDeleteAttribute = async () => {
    await deleteAttribute(_id).unwrap();
  }

  return (
    <>
      <Card>
        <CardHeader
          title={label}
          action={
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleMenuClose}>
          <MenuItem onClick={handleStartDeleting}>Delete</MenuItem>
          <MenuItem onClick={handleStartEditing}>Edit</MenuItem>
        </Menu>
        <CardContent>
          <AttributeOptionsList data={values as IAttributeOption[]} />
        </CardContent>
      </Card>

      {/* Attribute Deleting */}
      <ConfirmDialog
        isOpen={shouldDelete}
        handleClose={toggleShouldDelete}
        handleSubmit={handleDeleteAttribute}
        title="Delete Attribute"
        text="Are you sure you want to delete this attribute?"
      />

      {/* Attribute Updating */}
      <CustomModal
        isOpen={shouldEdit}
        handleClose={toggleShouldEdit}
        title="Editing Attribute">
        <AttributeForm
          onSubmit={handleUpdateAttribute}
          isLoading={false}
          formData={{ _id, label, values }}
        />
      </CustomModal>
    </>
  );
};

export default Attribute;
