import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateQueryString } from "../../store/reducers/templateReducer";
import { Stack, Button, Box, Typography } from "@mui/material";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { RootState } from "../../store";

const TemplateCategoryFilter = () => {
  const { categories } = useSelector((state: RootState) => state.category);
  const [activeCategory, setActiveCategory] = useState(categories[0].title);
  const dispatch = useDispatch();

  const onChangeCategory = (event: any) => {
    if (event.target && event.target.textContent !== activeCategory) {
      setActiveCategory(event.target.textContent);

      dispatch(
        updateQueryString({ key: "category", value: event.target.textContent })
      );
    }
  };

  return (
    <Box>
      <Typography mb={1} variant="h5" component="h3">
        My categories
      </Typography>
      <Stack flexWrap="wrap" direction="row" spacing={1}>
        {categories.map((category: any) => (
          <Button
            onClick={onChangeCategory}
            size="small"
            variant="contained"
            key={category._id}
            title={capitalizeFirstLetter(category.title)}
            sx={{
              background:
                activeCategory === category.title
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
