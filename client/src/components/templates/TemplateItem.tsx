import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { ITemplateLite } from "../../types";

const templateStyles = {
  display: "flex",
  maxHeight: 50,
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 1,
  backgroundColor: "#ccc",
  color: "#333",
  padding: 2,
  cursor: "pointer",
  border: "1px solid transparent",
  "&:hover": {
    backgroundColor: "#75ACE4",
    color: "#fff",
  },
};

const TemplateItem: React.FC<ITemplateLite> = ({ _id, title }) => {
  const { templateId } = useParams();
  const navigate = useNavigate();

  const onNavigateTemplate = () => {
    const templatePath = `/templates/${_id}`;
    navigate(templatePath);
  };

  templateStyles.backgroundColor = _id === templateId ? "#1976d2" : "#ccc";
  templateStyles.color = _id === templateId ? "#fff" : "#333";

  return (
    <Box onClick={onNavigateTemplate} sx={templateStyles}>
      <Typography variant="body1" component="h5">
        {title}
      </Typography>
    </Box>
  );
};

export default TemplateItem;
