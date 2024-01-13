import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateQueryString } from "../../store/reducers/templatesSlice";

// Components
import {
  Stack,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import { displayGenderIcon } from "../../utils/helpers";

const selectGenders = (state: RootState) => state.templates.genderOptions;
const selectGenderQuery = (state: RootState) => state.templates.queryObj.gender;

const TemplateGenderFilter = () => {
  const genderOptions = useSelector(selectGenders);
  const genderQuery = useSelector(selectGenderQuery);

  const dispatch = useDispatch();

  const onGenderChange = (
    e: React.MouseEvent<HTMLElement>,
    value: string = ""
  ) => {
    dispatch(updateQueryString({ key: "gender", value }));
  };

  return (
    <Stack spacing={1}>
      <Typography variant="body1" component="h4">
        Gender:
      </Typography>
      <ToggleButtonGroup
        onChange={onGenderChange}
        value={genderQuery}
        exclusive
        size="small"
      >
        {genderOptions.map((gender, i) => (
          <ToggleButton key={i} value={gender}>
            {displayGenderIcon(gender)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default TemplateGenderFilter;
