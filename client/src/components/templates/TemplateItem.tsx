import { Typography, Chip, Stack } from "@mui/material";
import { IAttributeValue, ITemplateItem } from "../../types";
import PushPinIcon from '@mui/icons-material/PushPin';
import { useDispatch, useSelector } from "react-redux";
import { selectHoveredTemplate, selectIsPinned, setHoveredTemplate, setIsPinned } from "../../store/slices/templateSlice";

const styles = {
  borderRadius: 1,
  backgroundColor: "#ccc",
  color: "#333",
  padding: 1,
  cursor: "pointer",
};

const TemplateItem: React.FC<ITemplateItem> = (template) => {
  const currentHover = useSelector(selectHoveredTemplate);
  const isPinned = useSelector(selectIsPinned);
  const dispatch = useDispatch();

  const hoverTemplateId = currentHover && currentHover._id
  const isCurrentHover = template._id === hoverTemplateId

  styles.backgroundColor = template._id === hoverTemplateId ? "#1976d2" : "#ccc";
  styles.color = template._id === hoverTemplateId ? "#fff" : "#333";

  const handleHoverTemplate = () => {
    if (isPinned) return

    if (currentHover && currentHover._id !== template._id) {
      dispatch(setHoveredTemplate(template))
    } else {
      dispatch(setHoveredTemplate(template))
    }
  }

  const handleTogglePinTemplate = () => {
    if (!isPinned && isCurrentHover) {
      dispatch(setIsPinned(true))
    }

    if (isPinned && isCurrentHover) {
      dispatch(setIsPinned(false))
    } else {
      dispatch(setIsPinned(true))
      dispatch(setHoveredTemplate(template))
    }
  }

  const renderedAttributes = (template.attributeValues as IAttributeValue[]).map(
    (attribute: IAttributeValue) =>
    (
      <Chip
        key={attribute._id}
        sx={{ fontSize: 10 }}
        size="small"
        label={attribute.value} />
    ))

  return (
    <Stack
      sx={styles}
      spacing={0.5}
      onClick={handleTogglePinTemplate}
      onMouseEnter={handleHoverTemplate}
    >
      <Stack flexDirection='row' justifyContent='space-between'>
        <Typography variant="body1" component="h5">
          {template.title}
        </Typography>
        {currentHover?._id === template._id && isPinned && <PushPinIcon />}
      </Stack>
      <Stack flexDirection='row' gap={1}>
        {renderedAttributes}
      </Stack>
    </Stack>
  );
};

export default TemplateItem;


