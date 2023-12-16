import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

import SettingsIcon from "@mui/icons-material/Settings";

import BasicModal from "../ui/BasicModal";
import CategoryAdd from "./CategoryAdd";
import CategoriesList from "./CategoriesList";

type MenuOptions = "add" | "edit" | null;

export default function CategoriesOptions() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModal, setIsModal] = useState(false);
  const [menuOption, setMenuOption] = useState<MenuOptions>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const handleModalOpen = () => setIsModal(true);
  const handleModalClose = () => setIsModal(false);

  const handleMenuOption = (option: MenuOptions) => {
    handleClose();
    handleModalOpen();
    setMenuOption(option);
  };

  return (
    <div>
      <Button
        startIcon={<SettingsIcon />}
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
      >
        Options
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleMenuOption("add")}>
          Add category
        </MenuItem>

        <MenuItem onClick={() => handleMenuOption("edit")}>
          Edit categories
        </MenuItem>
      </Menu>

      <BasicModal handleClose={handleModalClose} isOpen={isModal}>
        {menuOption === "add" && <CategoryAdd />}
        {menuOption === "edit" && <CategoriesList />}
      </BasicModal>
    </div>
  );
}
