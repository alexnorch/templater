import { Editor, EditorState, convertFromRaw } from "draft-js";
import {
  Stack,
  Typography,
  IconButton,
  Box,
  Divider,
  Chip,
  Tooltip,
} from "@mui/material";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IAttributeValue } from "../../types";

interface TemplateDetailsProps {
  title: string;
  attributeValues: IAttributeValue[];
  text: string;
  onStartEditing: () => void;
  onStartDeleting: () => void;
  onCopyText: (editorState: EditorState) => void;
}

const TemplateDetails: React.FC<TemplateDetailsProps> = ({
  attributeValues,
  title,
  text,
  onStartDeleting,
  onStartEditing,
  onCopyText,
}) => {

  const templateAttributes = (attributeValues as IAttributeValue[]).map(
    ({ value, _id }) => <Chip key={_id} label={value} />
  );

  const editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(text))
  );

  return (
    <Stack sx={{ height: '100%' }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography ml={2} variant="h5" component="h4">
          {title}
        </Typography>
        <Box>
          <IconButton
            onClick={onStartEditing}
            size="small">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={onStartDeleting}
            size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Stack>

      <Tooltip title="Click the text to copy it." placement="top">
        <Box
          onClick={() => onCopyText(editorState)}
          my={1}>
          <Editor onChange={() => null} readOnly={true} editorState={editorState} />
        </Box>
      </Tooltip>

      <Divider sx={{ marginY: 1 }} />
      <Stack gap={2} p={1} flexDirection="row" alignItems="center">
        {templateAttributes}
      </Stack>
    </Stack>
  );
};

export default TemplateDetails;
