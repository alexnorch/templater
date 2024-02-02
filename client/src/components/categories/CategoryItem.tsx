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
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "./categoriesSlice";

const CategoryItem: React.FC<ICategoryItem> = ({ title, _id }) => {
  const [shouldDelete, setShouldDelete] = useState<boolean>(false);
  const [shouldEdit, setShouldEdit] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const categoryTitle = capitalizeFirstLetter(title);
  const categoryAvatar = title?.charAt(0).toUpperCase();

  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const onDeleteCategory = async () => {
    await deleteCategory(_id).unwrap();
    handleFinishDeleting();
  };

  const onEditCategory = async (data: ICategoryItem) => {
    await updateCategory(data).unwrap();
    handleFinishEditing();
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);
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
      <Card>
        <CardHeader
          avatar={<Avatar>{categoryAvatar}</Avatar>}
          action={
            <IconButton onClick={handleMenuOpen} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={categoryTitle}
        />
        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleMenuClose}>
          <MenuItem onClick={handleStartDeleting}>Delete</MenuItem>
          <MenuItem onClick={handleStartEditing}>Edit</MenuItem>
        </Menu>
      </Card>

      {/* Deleting category */}
      <ConfirmDialog
        title="Deleting category"
        text="Are you sure you want to delete this category?"
        isOpen={shouldDelete}
        handleClose={handleFinishDeleting}
        handleSubmit={onDeleteCategory}
      />

      {/* Editing category */}
      <BasicModal
        title="Editing Template"
        isOpen={shouldEdit}
        handleClose={handleFinishEditing}
      >
        <CategoryForm values={{ _id, title }} onSubmit={onEditCategory} />
      </BasicModal>
    </>
  );
};

export default CategoryItem;
