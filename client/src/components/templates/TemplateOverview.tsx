import { useState, useEffect } from "react";
import { showAlert } from "../../store/reducers/appReducer";
import useTemplateServices from "../../hooks/useTemplateServices";
import { ITemplateItem } from "../../types";
import { useSelector } from "react-redux";

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Divider,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Skeleton,
} from "@mui/material";

import BasicModal from "../ui/BasicModal";
import TemplateForm from "./TemplateForm";
import ConfirmDialog from "../ui/ConfirmDialog";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { RootState } from "../../store";

const TemplateOverview = () => {
  const [singleTemplate, setSingleTemplate] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const isOpen = Boolean(anchorEl);
  const { fetchTemplateById } = useTemplateServices();

  const { selectedTemplateId } = useSelector(
    (state: RootState) => state.template
  );

  useEffect(() => {
    const getSingleTemplate = async () => {
      if (selectedTemplateId) {
        const response = await fetchTemplateById();
        setSingleTemplate(response);
      }
    };

    getSingleTemplate();
  }, [selectedTemplateId]);

  const { deleteTemplate, updateTemplate } = useTemplateServices();

  //   const { title } = singleTemplate[0];

  console.log(singleTemplate);

  // Starting editing or deleting
  const handleStartAction = (action: string) => {
    handleMenuClose();

    if (action === "deleting") setIsDeleting(true);
    if (action === "editing") setIsEditing(true);
  };

  // Copying template text to the clipboard
  const onCopyText = () => {
    // if (text) {
    //   navigator.clipboard.writeText(text);
    //   dispatch(showAlert({ type: "success", text: "Copied to the clipboard" }));
    // }
  };

  const handleUpdateTemplate = (data: ITemplateItem) => {
    updateTemplate("123", data);
    handleFinishAction();
  };

  const handleDeleteTemplate = () => {
    deleteTemplate("123");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  // Finishing editing or deleting
  const handleFinishAction = () => {
    setIsDeleting(false);
    setIsEditing(false);
  };

  return (
    <>
      <Typography mb={2} variant="body1" component="h4">
        Template Overview
      </Typography>
      <Card>
        <CardHeader
          title="Test"
          action={
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent sx={{ position: "relative", minHeight: 250 }}>
          <IconButton
            onClick={onCopyText}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <ContentCopyIcon fontSize="inherit" />
          </IconButton>
          <Typography pr={5} variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            distinctio dignissimos nam doloribus temporibus atque quisquam,
            velit fugiat, aut necessitatibus nesciunt, cumque minima! Asperiores
            provident, facilis rem odit dignissimos soluta quibusdam explicabo
            illo a expedita.
          </Typography>
        </CardContent>
        <Divider />
        <Stack
          p={1}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>Male</Box>
          <Box>PL</Box>
        </Stack>
        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleMenuClose}>
          <MenuItem onClick={() => alert("deleting")}>Delete</MenuItem>
          <MenuItem onClick={() => alert("editing")}>Edit</MenuItem>
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
      {/* <BasicModal isOpen={isEditing} handleClose={handleFinishAction}>
        <TemplateForm
          heading="Edit template"
          onSubmit={handleUpdateTemplate}
          values={null}
        />
      </BasicModal> */}
    </>
  );
};

export default TemplateOverview;
