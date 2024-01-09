import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  setIsTemplateDeleting,
  setIsTemplateEditing,
} from "../../store/reducers/templatesSlice";

// Components
import { Typography, Stack, Divider, IconButton, Box } from "@mui/material";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { displayGenderIcon } from "../../utils/helpers";

const TemplateDetails = () => {
  const { singleTemplate } = useSelector((state: RootState) => state.templates);

  const dispatch = useDispatch();

  const startTemplateDeleting = () => {
    dispatch(setIsTemplateDeleting(true));
  };

  const startTemplateEditing = () => {
    dispatch(setIsTemplateEditing(true));
  };

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" component="h4">
          {singleTemplate.title}
        </Typography>
        <Box>
          <IconButton onClick={startTemplateEditing} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={startTemplateDeleting} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Stack>
      <Box my={1}>
        <Typography sx={{ lineHeight: "25px" }} pr={5} variant="body2">
          {singleTemplate.text}
        </Typography>
      </Box>
      <Divider />
      <Stack
        p={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>{displayGenderIcon(singleTemplate.gender)}</Box>
        <Box>{singleTemplate.language}</Box>
      </Stack>
    </Stack>
  );
};

export default TemplateDetails;
