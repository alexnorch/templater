import { useState } from "react";

import {
  Typography,
  Stack,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import BasicModal from "../ui/BasicModal";

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

const CategoryItem: React.FC<CategoryItem> = ({ title }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState(title);

  // Handle editing
  const handleStartEditingCategory = () => setIsEditing(true);
  const handleFinishEditingCategory = () => setIsEditing(false);

  // Handle deleting
  const handleStartDeletingCategory = () => setIsDeleting(true);
  const handleFinishDeletingCategory = () => setIsDeleting(false);

  const onDeleteCategory = () => {
    handleFinishDeletingCategory();
  };

  const onEditCategory = () => {
    handleFinishEditingCategory();
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
      {title}
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
            onEdit={handleStartEditingCategory}
            onConfirm={onEditCategory}
          />
          <IconButton onClick={handleStartDeletingCategory} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
      <BasicModal
        isOpen={isDeleting}
        handleClose={handleFinishDeletingCategory}
      >
        <Typography variant="h6" component="h4">
          Are you sure you want to delete this category?
        </Typography>
        <Stack mt={2} alignItems="flex-end">
          <Button onClick={onDeleteCategory} variant="contained" color="error">
            Delete
          </Button>
        </Stack>
      </BasicModal>
    </>
  );
};

const EditButton: React.FC<EditButtonProps> = ({
  isEditing,
  onEdit,
  onConfirm,
}) => {
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
