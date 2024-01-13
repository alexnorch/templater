import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ITemplateItem } from "../../types";
import { Box, Typography, IconButton } from "@mui/material";

import { showAlert } from "../../store/reducers/appSlice";

// Icons
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const TemplateLite: React.FC<ITemplateItem> = ({ _id, title, text }) => {
  const { templateId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Copying template text to the clipboard
  const onCopyText = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      dispatch(showAlert({ type: "success", text: "Copied to the clipboard" }));
    }
  };

  const onNavigateTemplate = () => {
    navigate(`/templates/${_id}`);
  };

  const boxStyles = {
    display: "flex",
    maxHeight: 50,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 1,
    backgroundColor: _id === templateId ? "#1976d2" : "#bbb",
    color: _id === templateId ? "#fff" : "#333",
    padding: 2,
    cursor: "pointer",
    border: "1px solid transparent",
    "&:hover": {
      backgroundColor: "#75ACE4",
      color: "#fff",
    },
  };

  return (
    <>
      <Box onClick={onNavigateTemplate} sx={boxStyles}>
        <Typography variant="body1" component="h5">
          {title}
        </Typography>
        <IconButton onClick={onCopyText}>
          <ContentCopyIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </>
  );
};

export default TemplateLite;
