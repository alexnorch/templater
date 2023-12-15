import { useState } from "react";

// External components
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";

// Internal components
import BasicModal from "../ui/BasicModal";
import ConfirmDialog from "../ui/ConfirmDialog";
import TemplateForm from "./TemplateForm";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Utils
import { displayGenderIcon } from "../../utils/templateUtils";

type actionType = "deleting" | "editing" | null;

const TemplateItem = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const onDelete = () => alert("Deleted");
  const onEdit = () => alert("Edited");

  // Starting editing or deleting
  const handleStartAction = (action: string) => {
    handleMenuClose();

    if (action === "deleting") setIsDeleting(true);
    if (action === "editing") setIsEditing(true);
  };

  // Finishing editing or deleting
  const handleFinishAction = () => {
    setIsDeleting(false);
    setIsEditing(false);
  };

  return (
    <>
      {/* Card item */}
      <Card>
        <CardActionArea>
          <CardHeader
            title="Withdraw under 500 EUR"
            action={
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              text
            </Typography>
          </CardContent>
          <Divider />
          <Stack
            p={1}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box component="span">{displayGenderIcon("male")}</Box>
            <Box component="span">PL</Box>
          </Stack>
        </CardActionArea>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleStartAction("deleting")}>
            Delete
          </MenuItem>
          <MenuItem onClick={() => handleStartAction("editing")}>Edit</MenuItem>
        </Menu>
      </Card>

      {/* Deleting template */}
      <ConfirmDialog
        title="Template deleting"
        text="Are you sure you want to delete this template?"
        isOpen={isDeleting}
        handleClose={handleFinishAction}
        handleSubmit={onDelete}
      />

      {/* Editing template */}
      <BasicModal isOpen={isEditing} handleClose={handleFinishAction}>
        <TemplateForm heading="Edit template" onSubmit={onEdit} />
      </BasicModal>
    </>
  );
};
export default TemplateItem;
