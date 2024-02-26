import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { setTitle } from "./filterSlice";
import { TextField, Box } from "@mui/material";

const FilterByTitle = () => {
  const [value, setValue] = useState<string>("");
  const [debouncedValue] = useDebounce(value, 1000);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle(debouncedValue));
  }, [debouncedValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Box width={{ md: "25%", xs: "100%" }}>
      <TextField
        fullWidth
        onChange={handleChange}
        size="small"
        value={value}
        variant="outlined"
        placeholder="Search template by title"
      />
    </Box>
  );
};

export default FilterByTitle;
