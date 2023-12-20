import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateQueryString } from "../../store/reducers/templateReducer";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const TemplateLangFilter = () => {
  const { languageOptions, queryObj } = useSelector(
    (state: RootState) => state.template
  );

  const dispatch = useDispatch();

  const onLangChange = (e: SelectChangeEvent) => {
    dispatch(updateQueryString({ key: "language", value: e.target.value }));
  };

  useEffect(() => {}, []);

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>Language</InputLabel>
      <Select
        onChange={onLangChange}
        value={queryObj.language}
        label="Language"
      >
        {languageOptions.map((lang, i) => (
          <MenuItem key={i} value={lang}>
            {lang}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TemplateLangFilter;
