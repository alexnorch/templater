import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Grid } from "@mui/material";
import CategoryItem from "./CategoryItem";

const CategoriesList = () => {
  const { categories } = useSelector((state: RootState) => state.category);
  return (
    <Grid spacing={2} container>
      {categories.map((item) => (
        <Grid item md={4}>
          <CategoryItem key={item._id} _id={item._id} title={item.title} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoriesList;
