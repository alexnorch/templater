import { useState } from "react";

import { Typography, Stack, IconButton, TextField } from "@mui/material";

import ConfirmDialog from "../ui/ConfirmDialog";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

interface EditButtonProps {
  isEditing: boolean;
  onEdit: () => void;
  onConfirm: () => void;
}

interface CategoryItem {
  title: string;
}

import { capitalizeFirstLetter } from "../../utils/helpers";

const CategoryItem: React.FC<CategoryItem> = ({ title }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState(title);

  // Handle editing
  const handleStartEditing = () => setIsEditing(true);
  const handleFinishEditing = () => setIsEditing(false);

  // Handle deleting
  const handleStartDeleting = () => setIsDeleting(true);
  const handleFinishDeleting = () => setIsDeleting(false);

  const onDeleteCategory = () => {
    handleFinishDeleting();
  };

  const onEditCategory = () => {
    handleFinishEditing();
  };

  const categoryContent = isEditing ? (
    <TextField
      fullWidth
      value={newTitle}
      label="Category title"
      variant="standard"
    />
  ) : (
    <Typography component="h4" variant="h6">
      {title && capitalizeFirstLetter(title)}
    </Typography>
  );

  return (
    <>
      <Stack
        minHeight={50}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {categoryContent}
        <Stack flexDirection="row">
          <EditButton
            isEditing={isEditing}
            onEdit={handleStartEditing}
            onConfirm={onEditCategory}
          />
          <IconButton onClick={handleStartDeleting} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {/* Deleting category */}
      <ConfirmDialog
        title="Deleting category"
        text="Are you sure you want to delete this category?"
        isOpen={isDeleting}
        handleClose={handleFinishDeleting}
        handleSubmit={onDeleteCategory}
      />
    </>
  );
};

const EditButton: React.FC<EditButtonProps> = (props) => {
  const { isEditing, onEdit, onConfirm } = props;

  const handleClick = isEditing ? onConfirm : onEdit;

  return (
    <IconButton sx={{ flexShrink: 0 }} onClick={handleClick} size="small">
      {isEditing ? (
        <CheckIcon fontSize="small" />
      ) : (
        <EditIcon fontSize="small" />
      )}
    </IconButton>
  );
};

export default CategoryItem;
