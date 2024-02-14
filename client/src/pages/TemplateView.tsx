import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Editor, EditorState, convertFromRaw } from "draft-js";

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
import { IAttributeValue } from "../types";

const TemplateView = () => {
  const [shouldDelete, setShouldDelete] = useState(false);
  const { templateId } = useParams();
  const navigate = useNavigate();
  const {
    data: template,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetTemplateQuery(templateId);

  const [deleteTemplate] = useDeleteTemplateMutation();

  const startDeleting = () => setShouldDelete(true);
  const finishDeleting = () => setShouldDelete(false);

  const onDeleteTemplate = () => {
    deleteTemplate(templateId);
    setShouldDelete(false);
    navigate("/templates");

    toast.success("Successfully deleted");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{JSON.stringify(error)}</p>;
  if (!isSuccess) return;

  const templateAttributes = (
    template.attributeValues as IAttributeValue[]
  ).map(({ value, _id }) => <Chip key={_id} label={value} />);

  const editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(template.text))
  );

  const handleCopyText = () => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography ml={2} variant="h5" component="h4">
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
        <Box
          sx={{
            borderRadius: 2,
            cursor: "pointer",
            ":hover": { backgroundColor: "#ddd" },
          }}
          onClick={handleCopyText}
          my={1}
        >
          <Editor readOnly={true} editorState={editorState} />
        </Box>
        <Divider sx={{ marginY: 1 }} />
        <Stack gap={2} p={1} flexDirection="row" alignItems="center">
          {templateAttributes}
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
