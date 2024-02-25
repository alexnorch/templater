import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Stack } from "@mui/material";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import { setCategory } from "./filterSlice";
import { ICategoryItem } from "../../types";

import { Skeleton } from "@mui/material";

const FilterByCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: categories = [], isLoading } = useGetCategoriesQuery();

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
        <Button
          onClick={handleChange}
          size="small"
          variant="contained"
          key={_id}
          sx={btnStyles}
        >
          {title}
        </Button>
      );
    }
  );

  return (
    <Stack mt={3} flexDirection="row" gap={2} flexWrap="wrap">
      {isLoading && <Skeleton variant="rounded" width={150} height={35} />}
      {filterCategoriesItems}
    </Stack>
  );
};

export default FilterByCategory;
