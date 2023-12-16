import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../store/reducers/appReducer";

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

// Internal components
import BasicModal from "../ui/BasicModal";
import ConfirmDialog from "../ui/ConfirmDialog";
import TemplateForm from "./TemplateForm";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// Utils
import { displayGenderIcon } from "../../utils/templateUtils";

const TemplateItem = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const isOpen = Boolean(anchorEl);
  const templateContentRef = useRef<HTMLElement | null>(null);
  const dispatch = useDispatch();

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

  // Copying template text to the clipboard
  const onCopyText = () => {
    const textContent = templateContentRef.current?.textContent;

    if (textContent) {
      navigator.clipboard.writeText(textContent);
      dispatch(showAlert({ type: "success", text: "Copied to the clipboard" }));
    }
  };

  return (
    <>
      {/* Card item */}
      <Card>
        <CardHeader
          title="Withdraw under 500 EUR"
          action={
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent sx={{ position: "relative" }}>
          <IconButton
            onClick={onCopyText}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <ContentCopyIcon fontSize="inherit" />
          </IconButton>
          <Typography ref={templateContentRef} pr={5} variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quia
            eaque labore a cupiditate ipsam facilis sapiente sit ratione,
            voluptatem temporibus eum sequi unde enim. Consequatur architecto
            esse est exercitationem itaque ipsam nam voluptate tempore.
          </Typography>
        </CardContent>
        <Divider />
        <Stack
          p={1}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>{displayGenderIcon("male")}</Box>
          <Box>PL</Box>
        </Stack>
        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleMenuClose}>
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
