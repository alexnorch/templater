import { useState } from "react";

// External components
import {
  IconButton,
  Menu,
  MenuItem,
  Card,
  CardHeader,
  Avatar,
} from "@mui/material";

// Internal components
import ConfirmDialog from "../ui/ConfirmDialog";
import CategoryForm from "./CategoryForm";
import BasicModal from "../ui/BasicModal";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { ICategoryItem } from "../../types";
import { capitalizeFirstLetter } from "../../utils/helpers";

// API

const CategoryItem: React.FC<ICategoryItem> = ({ title, _id }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const onDeleteCategory = () => {
    handleFinishActions();
    alert("Deleted");
  };

  const onEditCategory = (data: ICategoryItem) => {
    alert("Updated");

    handleFinishActions();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  // Finishing editing or deleting
  const handleFinishActions = () => {
    setIsDeleting(false);
    setIsEditing(false);
  };

  // Starting editing or deleting
  const handleStartAction = (action: string) => {
    handleMenuClose();

    if (action === "deleting") setIsDeleting(true);
    if (action === "editing") setIsEditing(true);
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar>{title.charAt(0).toUpperCase()}</Avatar>}
          action={
            <IconButton onClick={handleMenuOpen} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title && capitalizeFirstLetter(title)}
        />
        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleStartAction("deleting")}>
            Delete
          </MenuItem>
          <MenuItem onClick={() => handleStartAction("editing")}>Edit</MenuItem>
        </Menu>
      </Card>

      {/* Deleting category */}
      <ConfirmDialog
        title="Deleting category"
        text="Are you sure you want to delete this category?"
        isOpen={isDeleting}
        handleClose={handleFinishActions}
        handleSubmit={onDeleteCategory}
      />

      {/* Editing category */}
      <BasicModal isOpen={isEditing} handleClose={handleFinishActions}>
        <CategoryForm values={{ title, _id }} onSubmit={onEditCategory} />
      </BasicModal>
    </>
  );
};

export default CategoryItem;
