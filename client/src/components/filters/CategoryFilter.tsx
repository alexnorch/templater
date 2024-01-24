import { useState } from "react";
import { useDispatch } from "react-redux";
import { Stack, Button, Box } from "@mui/material";
import { useGetCategoriesQuery } from "../categories/categoriesApi";
import { setCategory } from "./filterSlice";

const TemplateCategoryFilter = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const { data: categories } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  const onChangeCategory = (id: string) => {
    setActiveCategory(id);

    if (id !== activeCategory) {
      dispatch(setCategory(id));
    }
  };

  const renderCategoryItems = () => {
    if (categories) {
      return categories.map((category: any) => (
        <Button
          onClick={() => onChangeCategory(category._id)}
          size="small"
          variant="contained"
          key={category._id}
          sx={{
            background:
              activeCategory === category._id ? "palette.primary.dark" : "#bbb",
          }}
        >
          {category.title}
        </Button>
      ));
    }
  };

  const renderedCategories = renderCategoryItems();

  const buttonStyles = {
    background: activeCategory === "" ? "palette.primary.dark" : "#bbb",
  };

  return (
    <Box mt={2}>
      <Stack flexWrap="wrap" direction="row" spacing={1}>
        <Button
          onClick={() => onChangeCategory("")}
          size="small"
          variant="contained"
          sx={buttonStyles}
        >
          All
        </Button>
        {renderedCategories}
      </Stack>
    </Box>
  );
};

export default TemplateCategoryFilter;
