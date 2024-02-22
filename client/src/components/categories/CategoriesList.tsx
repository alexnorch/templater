import { Grid, Typography } from "@mui/material";
import CategoryItem from "./CategoryItem";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import { ICategoryItem } from "../../types";

const CategoriesList = () => {
  const {
    data: categories = [],
    isLoading,
    isSuccess,
  } = useGetCategoriesQuery();

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isSuccess && categories.length === 0)
    return (
      <Typography>
        You don't have any category yet. Please create your first category
      </Typography>
    );

  const categoryElements = categories.map(({ _id, title }: ICategoryItem) => (
    <Grid item md={3} sm={6} xs={12} key={_id}>
      <CategoryItem _id={_id} title={title} />
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      {categoryElements}
    </Grid>
  );
};

export default CategoriesList;
