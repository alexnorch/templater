import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import { setCategory, selectFilterCategory } from "../../store/slices/filterSlice";
import { ICategoryItem } from "../../types";

const activeBgColor = "palette.primary.dark"
const defaultBgColor = '#bbb'

const FilterByCategory: React.FC = () => {
  const { data: categories = [] } = useGetCategoriesQuery();
  const selectedCategory = useSelector(selectFilterCategory)
  const dispatch = useDispatch();

  const handleChangeCategory = (categoryId: string | null) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId
    dispatch(setCategory(newCategory));
  };

  const filterCategoriesItems = categories.map(
    ({ _id, title }: ICategoryItem) => {

      return (
        <Grid md={4} item>
          <Button
            fullWidth
            onClick={handleChangeCategory.bind(null, _id!)}
            size="small"
            variant="contained"
            key={_id}
            sx={{ background: selectedCategory === _id ? activeBgColor : defaultBgColor }}
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
