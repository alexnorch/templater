import { useDispatch, useSelector } from "react-redux";
import { Typography, Chip, Stack } from "@mui/material";
import { IAttributeOption, ITemplateItem } from "../../types";
import PushPinIcon from '@mui/icons-material/PushPin';

import {
  selectCurrentTemplate,
  setSelectedTemplate
} from "../../store/slices/templateSlice";


const defaultStyles = {
  borderRadius: 1,
  padding: 1,
  cursor: "pointer",
}

const activeStyles = {
  ...defaultStyles,
  backgroundColor: "#1976d2",
  color: '#fff',
}

const inActiveStyles = {
  ...defaultStyles,
  backgroundColor: "#e0e0e0",
  color: "#333",
  "&:hover": {
    backgroundColor: "#ccc"
  }
}

const TemplateItem: React.FC<ITemplateItem> = (template) => {
  const selectedTemplate = useSelector(selectCurrentTemplate);
  const dispatch = useDispatch();

  let templateStyles;

  if (template._id === selectedTemplate?._id) {
    templateStyles = activeStyles
  } else {
    templateStyles = inActiveStyles
  }

  const handleSelectTemplate = () => {
    if (selectedTemplate?._id !== template._id) {
      dispatch(setSelectedTemplate(template))
    }
  }

  const renderedAttributes = (template.attributeValues as IAttributeOption[]).map(
    (attribute: IAttributeOption) =>
    (
      <Chip
        key={attribute._id}
        sx={{ fontSize: 10 }}
        size="small"
        label={attribute.value} />
    ))

  return (
    <Stack
      sx={templateStyles}
      spacing={0.5}
      onClick={handleSelectTemplate}
    >
      <Stack flexDirection='row' justifyContent='space-between'>
        <Typography variant="body1" component="h5">
          {template.title}
        </Typography>
        {selectedTemplate?._id === template._id && <PushPinIcon />}
      </Stack>
      <Stack flexDirection='row' gap={1}>
        {renderedAttributes}
      </Stack>
    </Stack>
  );
};

export default TemplateItem;


