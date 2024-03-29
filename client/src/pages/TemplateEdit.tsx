import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { TemplateForm } from "../components/templates";
import { ITemplateItem } from "../types";

// API
import {
  useGetTemplateQuery,
  useUpdateTemplateMutation,
} from "../api/templateApi";

import { formatTemplateData } from "../utils/helpers";

const TemplateEdit: React.FC = () => {
  const { templateId } = useParams();
  const { data, isLoading, isSuccess } = useGetTemplateQuery(templateId);
  const [updateTemplate, { isLoading: isUpdateLoading }] =
    useUpdateTemplateMutation();

  const navigate = useNavigate();

  const onUpdateTemplate = async (data: ITemplateItem) => {
    await updateTemplate(formatTemplateData(data)).unwrap();
    toast.success("Successfully Updated");
    onNavigate();
  };

  const onNavigate = () => navigate(`/templates`);

  if (isLoading) return <p>Loading...</p>;
  if (!isSuccess) return;

  return (
    <Stack spacing={2}>
      <Typography variant='h5'>Editing Template</Typography>
      <TemplateForm mode="edit"
        data={data}
        isLoading={isUpdateLoading}
        onSubmit={onUpdateTemplate}
      />
    </Stack>
  );
};

export default TemplateEdit;
