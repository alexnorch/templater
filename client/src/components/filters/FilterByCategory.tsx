import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid } from "@mui/material";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import { setCategory } from "../../store/slices/filterSlice";
import { ICategoryItem } from "../../types";

const FilterByCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: categories = [] } = useGetCategoriesQuery();

  const dispatch = useDispatch();

  const handleChangeCategory = (categoryId: string | null) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;

    setSelectedCategory(newCategory);
    dispatch(setCategory(newCategory));
  };

  const filterCategoriesItems = categories.map(
    ({ _id, title }: ICategoryItem) => {
      const handleChange = () => handleChangeCategory(_id!);

      const btnStyles = {
        background: selectedCategory === _id ? "palette.primary.dark" : "#bbb",
      };

      return (
        <Grid md={4} item>
          <Button
            fullWidth
            onClick={handleChange}
            size="small"
            variant="contained"
            key={_id}
            sx={btnStyles}
          >
            {title}
          </Button>
        </Grid>

      );
    }
  );

  return (
    <Grid container spacing={2}>
      {filterCategoriesItems}
    </Grid>
  );
};

export default FilterByCategory;
