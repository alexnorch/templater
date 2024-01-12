import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQueryString } from "../../store/reducers/templatesSlice";
import { RootState } from "../../store";

import { TextField } from "@mui/material";

const SearchInput = () => {
  const { title } = useSelector((state: RootState) => state.templates.queryObj);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(title || "");

  // useEffect(() => {
  //   let timer: any;

  //   if (inputValue !== "") {
  //     timer = setTimeout(() => {
  //       dispatch(updateQueryString({ key: "title", value: inputValue }));
  //     }, 500);
  //   }

  //   return () => clearTimeout(timer);
  // }, [inputValue]);

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

export default SearchInput;
