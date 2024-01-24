import { useParams, useNavigate } from "react-router-dom";
import useAlert from "../hooks/useAlert";

import TemplateForm from "../components/templates/TemplateForm";

import { ITemplateItem } from "../types";

import { Box, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// API
import {
  useGetTemplateQuery,
  useUpdateTemplateMutation,
} from "../components/templates/templateSlice";

const TemplateEdit = () => {
  const { templateId } = useParams();
  const { data, isLoading } = useGetTemplateQuery(templateId);
  const { showSuccessAlert } = useAlert();
  const [updateTemplate, { isLoading: isUpdateLoading }] =
    useUpdateTemplateMutation();

  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const onUpdateTemplate = async (data: ITemplateItem) => {
    await updateTemplate(data).unwrap();
    onNavigate();
    showSuccessAlert("Successfully Updated");
  };

  const onNavigate = () => {
    navigate(`/templates/${templateId}`);
  };

  console.log(data);

  return (
    <>
      <TemplateForm
        isLoading={isUpdateLoading}
        values={data!}
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
