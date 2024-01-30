import { Grid, Typography } from "@mui/material";
import CategoryItem from "./CategoryItem";
import { useGetCategoriesQuery } from "./categoriesSlice";

const CategoriesList = () => {
  const { data: categories, isLoading, isSuccess } = useGetCategoriesQuery();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isSuccess && categories.length === 0) {
    return (
      <Typography>
        You don't have any category yet. Please create your first category
      </Typography>
    );
  }

  const categoryElements = categories?.map((category: any) => (
    <Grid item md={3} key={category._id}>
      <CategoryItem _id={category._id} title={category.title} />
    </Grid>
  ));

  return (
    <Grid container spacing={2} mt={1}>
      {categoryElements}
    </Grid>
  );
};

export default CategoriesList;
