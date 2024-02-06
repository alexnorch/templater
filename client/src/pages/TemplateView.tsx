import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import {
  Typography,
  Stack,
  Divider,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import ConfirmDialog from "../components/ui/ConfirmDialog";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// API
import {
  useGetTemplateQuery,
  useDeleteTemplateMutation,
} from "../components/templates/templateApi";

const TemplateView = () => {
  const [shouldDelete, setShouldDelete] = useState(false);
  const { templateId } = useParams();
  const navigate = useNavigate();
  const {
    data: template,
    isLoading,
    isError,
    isSuccess,
  } = useGetTemplateQuery(templateId);

  const [deleteTemplate] = useDeleteTemplateMutation();

  const startDeleting = () => setShouldDelete(true);
  const finishDeleting = () => setShouldDelete(false);

  const onDeleteTemplate = () => {
    deleteTemplate(templateId);
    setShouldDelete(false);
    navigate("/templates");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  if (!isSuccess) {
    return;
  }

  const renderedAttributes = template.attributeValues.map(({ value, _id }) => (
    <Chip key={_id} label={value} />
  ));

  return (
    <>
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5" component="h4">
            {template!.title}
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
            {template!.text}
          </Typography>
        </Box>
        <Divider sx={{ marginY: 1 }} />
        <Stack gap={2} p={1} flexDirection="row" alignItems="center">
          {renderedAttributes}
        </Stack>
      </Stack>

      {/* Deleting Template */}
      <ConfirmDialog
        title="Template deleting"
        text="Are you sure you want to delete this template?"
        isOpen={shouldDelete}
        handleClose={finishDeleting}
        handleSubmit={onDeleteTemplate}
      />
    </>
  );
};

export default TemplateView;
