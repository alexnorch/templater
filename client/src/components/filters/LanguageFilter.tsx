import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateQueryString } from "../../store/reducers/templatesSlice";

import {
  Stack,
  Typography,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

const TemplateLangFilter = () => {
  const { languageOptions, queryObj } = useSelector(
    (state: RootState) => state.templates
  );

  const dispatch = useDispatch();

  const onLangChange = (e: SelectChangeEvent) => {
    dispatch(updateQueryString({ key: "language", value: e.target.value }));
  };

  return (
    <Stack spacing={1}>
      <Typography variant="body1" component="h4">
        Language:
      </Typography>
      <Select
        onChange={onLangChange}
        variant="standard"
        value={queryObj.language}
        label="Language"
      >
        {languageOptions.map((lang, i) => (
          <MenuItem key={i} value={lang}>
            {lang}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default TemplateLangFilter;
