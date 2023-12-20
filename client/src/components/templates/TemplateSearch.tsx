import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQueryString } from "../../store/reducers/templateReducer";
import { RootState } from "../../store";
import TextField from "@mui/material/TextField";

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
      value={inputValue}
      onChange={handleInputChange}
      fullWidth
      label="Search template"
      variant="filled"
    />
  );
};

export default TemplateSearch;
