import { Editor, EditorState } from "draft-js";
import {
  Stack,
  Typography,
  IconButton,
  Box,
  Divider,
  Chip,
} from "@mui/material";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IAttributeValue } from "../../types";

interface TemplateDetailsProps {
  title: string;
  attributeValues: IAttributeValue[];
  content: EditorState;
  onStartEditing: () => void;
  onStartDeleting: () => void;
  onCopyText: () => void;
}

const TemplateDetails: React.FC<TemplateDetailsProps> = ({
  attributeValues,
  title,
  content,
  onStartDeleting,
  onStartEditing,
  onCopyText,
}) => {
  const templateAttributes = (attributeValues as IAttributeValue[]).map(
    ({ value, _id }) => <Chip key={_id} label={value} />
  );

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography ml={2} variant="h5" component="h4">
          {title}
        </Typography>
        <Box>
          <IconButton onClick={onStartEditing} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={onStartDeleting} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Stack>
      <Box onClick={onCopyText} my={1}>
        <Editor onChange={() => null} readOnly={true} editorState={content} />
      </Box>
      <Divider sx={{ marginY: 1 }} />
      <Stack gap={2} p={1} flexDirection="row" alignItems="center">
        {templateAttributes}
      </Stack>
    </Stack>
  );
};

export default TemplateDetails;
