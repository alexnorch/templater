import { useEffect } from "react";
import { Grid } from "@mui/material";
import CategoryItem from "./CategoryItem";
import useCategoriesServices from "../../services/useCategoriesServices";

const CategoriesList = () => {
  const { categoriesList, getAllCategories } = useCategoriesServices();

  useEffect(() => {
    getAllCategories();
  }, []);

  if (!categoriesList) {
    return <p>Not found</p>;
  }

  return (
    <Grid spacing={2} container>
      {categoriesList.map((item: any) => (
        <Grid key={item._id} item md={4}>
          <CategoryItem _id={item._id} title={item.title} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoriesList;
