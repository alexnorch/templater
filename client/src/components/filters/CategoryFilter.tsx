import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateQueryString } from "../../store/reducers/templatesSlice";
import { Stack, Button, Box, Typography } from "@mui/material";
import { useGetCategoriesQuery } from "../categories/categoriesApi";

const TemplateCategoryFilter = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const { data: categories } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  const onChangeCategory = (id: string) => {
    setActiveCategory(id);

    if (id !== activeCategory) {
      dispatch(updateQueryString({ key: "category", value: id }));
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

  const buttonStyles = {
    background: activeCategory === "" ? "palette.primary.dark" : "#bbb",
  };

  const renderedCategories = renderCategoryItems();

  return (
    <Box mt={2}>
      <Typography mb={1} variant="body1" component="h4">
        Categories:
      </Typography>

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
