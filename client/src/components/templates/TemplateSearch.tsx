import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQueryString } from "../../store/reducers/templateReducer";
import { RootState } from "../../store";

import { TextField } from "@mui/material";

const TemplateSearch = () => {
  const { queryObj } = useSelector((state: RootState) => state.template);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(queryObj.title || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateQueryString({ key: "title", value: inputValue }));
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <TextField
      fullWidth
      value={inputValue}
      onChange={handleInputChange}
      label="Template title"
      variant="filled"
    />
  );
};

export default TemplateSearch;
