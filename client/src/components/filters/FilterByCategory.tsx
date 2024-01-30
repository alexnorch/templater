import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Stack, IconButton } from "@mui/material";
import { useGetCategoriesQuery } from "../categories/categoriesSlice";
import { setCategory } from "./filterSlice";
import { ICategoryItem } from "../../types";
import ClearIcon from "@mui/icons-material/Clear";

const FilterByCategory = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const { data: categories } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  const onChangeCategory = (id: string) => {
    setActiveCategory(id);

    if (id !== activeCategory) {
      dispatch(setCategory(id));
    }
  };

  const filterCategoriesItems = categories?.map((category: ICategoryItem) => {
    const handleClick = () => onChangeCategory(category._id!);
    const buttonStyles = {
      background:
        activeCategory === category._id ? "palette.primary.dark" : "#bbb",
    };
    return (
      <Button
        onClick={handleClick}
        size="small"
        variant="contained"
        key={category._id}
        sx={buttonStyles}
      >
        {category.title}
      </Button>
    );
  });

  return (
    <Stack flexDirection="row" gap={2} flexWrap="wrap">
      {filterCategoriesItems}
      <IconButton onClick={() => onChangeCategory("")} size="small">
        <ClearIcon />
      </IconButton>
    </Stack>
  );
};

export default FilterByCategory;
