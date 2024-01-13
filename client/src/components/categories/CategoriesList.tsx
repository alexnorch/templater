import { Grid } from "@mui/material";
import CategoryItem from "./CategoryItem";
import { useGetCategoriesQuery } from "./categoriesApi";

const CategoriesList = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const renderCategories = () => {
    if (!categories) {
      return <p>Please, create your first category</p>;
    }

    return categories!.map((item: any) => (
      <Grid key={item._id} item md={3}>
        <CategoryItem _id={item._id} title={item.title} />
      </Grid>
    ));
  };

  const categoriesItems = renderCategories();

  return (
    <Grid spacing={2} container>
      {categoriesItems}
    </Grid>
  );
};

export default CategoriesList;
