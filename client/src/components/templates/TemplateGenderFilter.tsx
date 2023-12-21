import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateQueryString } from "../../store/reducers/templateReducer";

// Components
import {
  Stack,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import { displayGenderIcon } from "../../utils/helpers";

const TemplateGenderFilter = () => {
  const { genderOptions, queryObj } = useSelector(
    (state: RootState) => state.template
  );

  const dispatch = useDispatch();

  const onGenderChange = (e: React.MouseEvent<HTMLElement>, value: string) => {
    dispatch(updateQueryString({ key: "gender", value }));
  };

  return (
    <Stack spacing={1}>
      <Typography variant="body1" component="h4">
        Gender:
      </Typography>
      <ToggleButtonGroup
        onChange={onGenderChange}
        value={queryObj.gender}
        exclusive
        size="medium"
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
