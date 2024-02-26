import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Card,
  CardHeader,
  Avatar,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { ConfirmDialog, CustomModal } from "../ui";
import CategoryForm from "./CategoryForm";

import { ICategoryItem } from "../../types";
import { capitalizeFirstLetter } from "../../utils/helpers";

import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../api/categoryApi";

const CategoryItem: React.FC<ICategoryItem> = ({ title, _id }) => {
  const [shouldDelete, setShouldDelete] = useState<boolean>(false);
  const [shouldEdit, setShouldEdit] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const categoryTitle = capitalizeFirstLetter(title);
  const categoryAvatar = title?.charAt(0).toUpperCase();

  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isLoadingUpdate }] =
    useUpdateCategoryMutation();

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const onDeleteCategory = async () => {
    await deleteCategory(_id).unwrap();
    handleFinishDeleting();
  };

  const onEditCategory = async (data: ICategoryItem) => {
    await updateCategory(data).unwrap();
    handleFinishEditing();
  };

  const handleFinishEditing = () => setShouldEdit(false);
  const handleFinishDeleting = () => setShouldDelete(false);

  const handleStartEditing = () => {
    handleMenuClose();
    setShouldEdit(true);
  };

  const handleStartDeleting = () => {
    handleMenuClose();
    setShouldDelete(true);
  };

  return (
    <>
      {/* Category Content */}
      <Card>
        <CardHeader
          avatar={<Avatar>{categoryAvatar}</Avatar>}
          title={categoryTitle}
          action={
            <IconButton onClick={handleMenuOpen} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleMenuClose}>
          <MenuItem onClick={handleStartDeleting}>Delete</MenuItem>
          <MenuItem onClick={handleStartEditing}>Edit</MenuItem>
        </Menu>
      </Card>

      {/* Deleting category */}
      <ConfirmDialog
        isOpen={shouldDelete}
        handleClose={handleFinishDeleting}
        handleSubmit={onDeleteCategory}
        title="Deleting category"
        text="Are you sure you want to delete this category? 
        After deleting this category you will lose all templates that refers to this category"
      />

      {/* Editing category */}
      <CustomModal
        title="Edit Template"
        isOpen={shouldEdit}
        handleClose={handleFinishEditing}
      >
        <CategoryForm
          values={{ _id, title }}
          onSubmit={onEditCategory}
          isLoading={isLoadingUpdate}
        />
      </CustomModal>
    </>
  );
};

export default CategoryItem;
