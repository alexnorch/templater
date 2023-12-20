import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateQueryString } from "../../store/reducers/templateReducer";

// Components
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

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
  );
};

export default TemplateGenderFilter;
