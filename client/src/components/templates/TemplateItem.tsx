import { Box, Typography, IconButton } from "@mui/material";
import { ITemplateItem } from "../../types";
import PushPinIcon from '@mui/icons-material/PushPin';
import { useDispatch, useSelector } from "react-redux";
import { selectHoveredTemplate, selectPinnedTemplate, setHoveredTemplate, setPinnedTemplate } from "../../store/slices/templateSlice";

const templateStyles = {
  display: "flex",
  maxHeight: 45,
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

const TemplateItem: React.FC<ITemplateItem> = (template) => {
  const dispatch = useDispatch();
  const currentHover = useSelector(selectHoveredTemplate)
  const currentPin = useSelector(selectPinnedTemplate)


  templateStyles.backgroundColor = template._id === currentPin?._id ? "#1976d2" : "#ccc";
  templateStyles.color = template._id === currentPin?._id ? "#fff" : "#333";

  const handleHoverTemplate = () => {
    if (currentPin) return

    if (currentHover && currentHover._id !== template._id) {
      dispatch(setHoveredTemplate(template))
    } else {
      dispatch(setHoveredTemplate(template))
    }
  }

  const handleTogglePinTemplate = () => {
    if (!currentPin) {
      dispatch(setPinnedTemplate(template))
    } else if (currentPin && currentPin._id !== template._id) {
      dispatch(setPinnedTemplate(template))
    } else {
      dispatch(setPinnedTemplate(null))
    }
  }

  return (
    <Box
      onMouseEnter={handleHoverTemplate}
      sx={templateStyles}>
      <Typography variant="body1" component="h5">
        {template.title}
      </Typography>

      {currentHover?._id === template._id && (
        <IconButton
          size="small"
          onClick={handleTogglePinTemplate}>
          <PushPinIcon />
        </IconButton>
      )}

    </Box>
  );
};

export default TemplateItem;
