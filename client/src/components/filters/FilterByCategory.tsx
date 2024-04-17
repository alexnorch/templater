import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import { setCategory, selectFilterCategory } from "../../store/slices/filterSlice";

const FilterByCategory: React.FC = () => {
  const { data: categories = [] } = useGetCategoriesQuery();
  const selectedCategory = useSelector(selectFilterCategory)
  const dispatch = useDispatch();

  const handleChangeCategory = (e: SelectChangeEvent) => {
    dispatch(setCategory(e.target.value))
  }

  return (
    <FormControl size="small">
      <InputLabel shrink>Category</InputLabel>
      <Select
        displayEmpty
        value={selectedCategory || ''}
        label="Category"
        onChange={handleChangeCategory}
      >
        <MenuItem value=''>All categories</MenuItem>
        {categories.map((el) => (
          <MenuItem key={el._id} value={el._id}>{el.title}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterByCategory;
