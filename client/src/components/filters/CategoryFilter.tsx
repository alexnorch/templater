import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateQueryString } from "../../store/reducers/templatesSlice";
import { Stack, Button, Box, Typography } from "@mui/material";
import useCategoriesServices from "../../services/useCategoriesServices";

const TemplateCategoryFilter = () => {
  const { getAllCategories, categoriesList } = useCategoriesServices();

  const [activeCategory, setActiveCategory] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategories();
  }, []);

  const onChangeCategory = (id: string) => {
    setActiveCategory(id);

    if (id !== activeCategory) {
      dispatch(updateQueryString({ key: "category", value: id }));
    }
  };

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
          sx={{
            background: activeCategory === "" ? "palette.primary.dark" : "#bbb",
          }}
        >
          All
        </Button>
        {categoriesList.map((category: any) => (
          <Button
            onClick={() => onChangeCategory(category._id)}
            size="small"
            variant="contained"
            key={category._id}
            sx={{
              background:
                activeCategory === category._id
                  ? "palette.primary.dark"
                  : "#bbb",
            }}
          >
            {category.title}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default TemplateCategoryFilter;
