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

const selectLanguages = (state: RootState) => state.templates.languageOptions;
const selectLanguageQuery = (state: RootState) =>
  state.templates.queryObj.language;

const TemplateLangFilter = () => {
  const languageOptions = useSelector(selectLanguages);
  const languageQuery = useSelector(selectLanguageQuery);

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
        size="small"
        onChange={onLangChange}
        variant="standard"
        value={languageQuery}
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
