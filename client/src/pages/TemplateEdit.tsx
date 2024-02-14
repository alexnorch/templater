import { useParams, useNavigate } from "react-router-dom";
import { TemplateForm } from "../components/templates";
import { ITemplateItem } from "../types";
import { Box, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// API
import {
  useGetTemplateQuery,
  useUpdateTemplateMutation,
} from "../components/templates/templateApi";
import { toast } from "react-toastify";
import { formatTemplateData } from "../utils/helpers";

const TemplateEdit = () => {
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

  const onNavigate = () => {
    navigate(`/templates/${templateId}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!isSuccess) return;

  return (
    <>
      <TemplateForm
        mode="edit"
        values={data}
        isLoading={isUpdateLoading}
        onSubmit={onUpdateTemplate}
      />

      <Box mb={2}>
        <Button
          size="small"
          onClick={onNavigate}
          variant="text"
          startIcon={<ArrowBackIosIcon />}
        >
          Back to Template
        </Button>
      </Box>
    </>
  );
};

export default TemplateEdit;
