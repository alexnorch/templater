import { useState } from "react";
import { Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { EditorState, convertFromRaw } from "draft-js";
import { toast } from "react-toastify";
import { TemplateViewSkeleton, TemplateDetails } from "../components/templates";
import { ConfirmDialog, CenteredLoader } from "../components/ui";

// API
import {
  useGetTemplateQuery,
  useDeleteTemplateMutation,
} from "../api/templateApi";
import { IAttributeValue } from "../types";

const TemplateView = () => {
  const { templateId } = useParams();
  const [shouldDelete, setShouldDelete] = useState(false);
  const navigate = useNavigate();

  const {
    data: template,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetTemplateQuery(templateId);

  const [deleteTemplate] = useDeleteTemplateMutation();

  const handleToggleDeleting = () => setShouldDelete((prev) => !prev);
  const handleStartEditing = () => navigate("edit");

  if (isLoading) return <TemplateViewSkeleton />;
  if (isSuccess && !template) return <p>Not found</p>;
  if (!template) return null;

  const handleCopyText = () => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();

    navigator.clipboard.writeText(text);
  };

  const onDeleteTemplate = () => {
    deleteTemplate(templateId).unwrap();
    setShouldDelete(false);
    navigate("/templates");

    toast.success("Successfully deleted");
  };

  const editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(template.text))
  );

  return (
    <>
      <Stack sx={{ position: "relative" }}>
        {!isLoading && isFetching && <CenteredLoader />}
        <TemplateDetails
          title={template.title}
          attributeValues={template.attributeValues as IAttributeValue[]}
          content={editorState}
          onStartEditing={handleStartEditing}
          onStartDeleting={handleToggleDeleting}
          onCopyText={handleCopyText}
        />
      </Stack>

      {/* Deleting Template */}
      <ConfirmDialog
        title="Template deleting"
        text="Are you sure you want to delete this template?"
        isOpen={shouldDelete}
        handleClose={handleToggleDeleting}
        handleSubmit={onDeleteTemplate}
      />
    </>
  );
};

export default TemplateView;
