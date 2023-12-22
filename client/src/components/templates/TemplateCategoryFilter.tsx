import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateQueryString } from "../../store/reducers/templateReducer";
import { Stack, Button, Box, Typography } from "@mui/material";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { RootState } from "../../store";

const TemplateCategoryFilter = () => {
  const { categories } = useSelector((state: RootState) => state.category);
  const [activeCategory, setActiveCategory] = useState("");
  const dispatch = useDispatch();

  const onChangeCategory = (e: any) => {
    if (e.target && e.target.textContent !== activeCategory) {
      setActiveCategory(e.target.textContent);

      dispatch(
        updateQueryString({ key: "category", value: e.target.textContent })
      );
    }
  };

  return (
    <Box mt={2}>
      <Typography mb={1} variant="body1" component="h4">
        Categories:
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
