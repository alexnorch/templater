import { useState } from "react";
import { IconButton, Card, CardHeader, Menu, MenuItem, CardContent } from "@mui/material";
import { IAttribute, IAttributeOption, formMode } from "../../types";
import { AttributeOptionsList, AttributeForm } from ".";
import { ConfirmDialog, CustomModal } from "../ui";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useDeleteAttributeMutation } from "../../api/attributeApi";

const Attribute: React.FC<IAttribute> = ({
  _id,
  label,
  values,
}) => {
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldEdit, setShouldEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteAttribute] = useDeleteAttributeMutation();
  const isOpen = Boolean(anchorEl);

  const onDeleteAttribute = async () => await deleteAttribute(_id);
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

  const handleSubmitForm = () => {
    console.log('Submit')
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
        handleSubmit={onDeleteAttribute}
        title="Delete Attribute"
        text="Are you sure you want to delete this attribute?"
      />

      <CustomModal
        isOpen={shouldEdit}
        handleClose={toggleShouldEdit}
        title="Editing Attribute">
        <AttributeForm
          mode={formMode.edit}
          onSubmit={handleSubmitForm}
          isLoading={false}
          formData={{ _id, label, values }}
        />
      </CustomModal>
    </>
  );
};

export default Attribute;
