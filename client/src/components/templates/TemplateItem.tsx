import { Box, Typography, IconButton } from "@mui/material";
import { ITemplateItem } from "../../types";
import PushPinIcon from '@mui/icons-material/PushPin';
import { useDispatch, useSelector } from "react-redux";
import { selectHoveredTemplate, selectIsPinned, setHoveredTemplate, setIsPinned } from "../../store/slices/templateSlice";

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
  const currentHover = useSelector(selectHoveredTemplate);
  const isPinned = useSelector(selectIsPinned);
  const dispatch = useDispatch();

  const hoverTemplateId = currentHover && currentHover._id

  templateStyles.backgroundColor = template._id === hoverTemplateId ? "#1976d2" : "#ccc";
  templateStyles.color = template._id === hoverTemplateId ? "#fff" : "#333";

  const handleHoverTemplate = () => {
    if (isPinned) return

    if (currentHover && currentHover._id !== template._id) {
      dispatch(setHoveredTemplate(template))
    } else {
      dispatch(setHoveredTemplate(template))
    }
  }

  const handleTogglePinTemplate = () => {
    if (!isPinned && template._id === hoverTemplateId) {
      dispatch(setIsPinned(true))
    } else {
      dispatch(setIsPinned(false))
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
