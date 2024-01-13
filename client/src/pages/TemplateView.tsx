import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Components
import { Typography, Stack, Divider, IconButton, Box } from "@mui/material";
import TemplatePlaceholder from "../components/templates/TemplatePlaceholder";
import ConfirmDialog from "../components/ui/ConfirmDialog";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Utils
import { displayGenderIcon } from "../utils/helpers";

// API
import {
  useGetTemplateQuery,
  useDeleteTemplateMutation,
  useUpdateTemplateMutation,
} from "../components/templates/templateSlice";

const TemplateView = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { templateId } = useParams();
  const navigate = useNavigate();
  const { data: template, isLoading } = useGetTemplateQuery(templateId);
  const [deleteTemplate, state] = useDeleteTemplateMutation();

  const startDeleting = () => setIsDeleting(true);
  const finishDeleting = () => setIsDeleting(false);

  const onUpdateTemplate = () => {};

  const onDeleteTemplate = () => {
    deleteTemplate(templateId);
    navigate("/templates");
    setIsDeleting(false);
  };

  if (isLoading) {
    return <TemplatePlaceholder />;
  }

  return (
    <>
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5" component="h4">
            {template.title}
          </Typography>
          <Box>
            <IconButton onClick={() => navigate("edit")} size="small">
              <EditIcon />
            </IconButton>
            <IconButton onClick={startDeleting} size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Stack>
        <Box my={1}>
          <Typography sx={{ lineHeight: "25px" }} pr={5} variant="body2">
            {template.text}
          </Typography>
        </Box>
        <Divider />
        <Stack
          p={1}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>{displayGenderIcon(template.gender)}</Box>
          <Box>{template.language}</Box>
        </Stack>
      </Stack>

      {/* Deleting Template */}
      <ConfirmDialog
        title="Template deleting"
        text="Are you sure you want to delete this template?"
        isOpen={isDeleting}
        handleClose={finishDeleting}
        handleSubmit={onDeleteTemplate}
      />
    </>
  );
};

export default TemplateView;
