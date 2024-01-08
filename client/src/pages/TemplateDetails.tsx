import { useState } from "react";
import { ITemplateItem } from "../types";
import { displayGenderIcon } from "../utils/helpers";
import { useParams, useNavigate } from "react-router-dom";

import {
  Typography,
  Stack,
  Divider,
  IconButton,
  Box,
  Skeleton,
} from "@mui/material";

import BasicModal from "../components/ui/BasicModal";
import TemplateForm from "../components/templates/TemplateForm";
import ConfirmDialog from "../components/ui/ConfirmDialog";

import {
  useFetchTemplateByIdQuery,
  useDeleteTemplateMutation,
  useUpdateTemplateMutation,
} from "../store/api/templateApi";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TemplateDetails = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { templateId } = useParams();
  const navigate = useNavigate();

  const { data: singleTemplate, isLoading } =
    useFetchTemplateByIdQuery(templateId);

  const [deleteTemplate, {}] = useDeleteTemplateMutation();
  const [updateTemplate, {}] = useUpdateTemplateMutation();

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100%" height={250} />;
  }

  if (!singleTemplate) {
    return <p>Template wasn't found</p>;
  }

  const { title, text, language, gender, _id: id } = singleTemplate;

  const handleUpdateTemplate = (data: ITemplateItem) => {
    updateTemplate({ id, data });
    handleFinishAction();
  };

  const handleDeleteTemplate = () => {
    deleteTemplate(id).unwrap();
    handleFinishAction();
    navigate("/templates");
  };

  // Starting editing or deleting
  const handleStartAction = (action: "editing" | "deleting") => {
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
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5" component="h4">
            {title}
          </Typography>
          <Box>
            <IconButton
              onClick={() => handleStartAction("editing")}
              size="small"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleStartAction("deleting")}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Stack>
        <Box my={1}>
          <Typography sx={{ lineHeight: "25px" }} pr={5} variant="body2">
            {text}
          </Typography>
        </Box>
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
      </Stack>
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
          values={singleTemplate}
        />
      </BasicModal>
    </>
  );
};

export default TemplateDetails;

{
  /* <Menu anchorEl={anchorEl} open={isOpen} onClose={handleMenuClose}>
<MenuItem onClick={() => handleStartAction("deleting")}>
  Delete
</MenuItem>
<MenuItem onClick={() => handleStartAction("editing")}>Edit</MenuItem>
</Menu> */
}
