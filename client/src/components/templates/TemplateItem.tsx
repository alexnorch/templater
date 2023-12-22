import { useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../store/reducers/appReducer";
import useTemplateServices from "../../hooks/useTemplateServices";

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
import { ITemplateItem } from "../../types";

// Internal components
import BasicModal from "../ui/BasicModal";
import ConfirmDialog from "../ui/ConfirmDialog";
import TemplateForm from "./TemplateForm";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// Utils
import { displayGenderIcon } from "../../utils/helpers";
import { CardGiftcardRounded } from "@mui/icons-material";

const TemplateItem: React.FC<ITemplateItem> = (props) => {
  const { _id, title, language, gender, text, category } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const isOpen = Boolean(anchorEl);
  const dispatch = useDispatch();

  const { deleteTemplate, updateTemplate } = useTemplateServices();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

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
    if (text) {
      navigator.clipboard.writeText(text);
      dispatch(showAlert({ type: "success", text: "Copied to the clipboard" }));
    }
  };

  const handleUpdateTemplate = (data: ITemplateItem) => {
    updateTemplate(_id, data);
    handleFinishAction();
  };

  const handleDeleteTemplate = () => {
    deleteTemplate(_id);
  };

  return (
    <>
      {/* Card item */}
      <Card>
        <CardHeader
          title={title}
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
          <Typography pr={5} variant="body2">
            {text}
          </Typography>
        </CardContent>
        <Divider />
        <Stack
          p={1}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>{displayGenderIcon(gender)}</Box>
          <Box>{language}</Box>
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
        handleSubmit={handleDeleteTemplate}
      />

      {/* Editing template */}
      <BasicModal isOpen={isEditing} handleClose={handleFinishAction}>
        <TemplateForm
          heading="Edit template"
          onSubmit={handleUpdateTemplate}
          values={props}
        />
      </BasicModal>
    </>
  );
};

export default TemplateItem;
