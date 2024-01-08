import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Grid, Skeleton } from "@mui/material";
import CategoryItem from "./CategoryItem";
import { RootState } from "../../store";
import { fetchCategoriesRequest } from "../../store/reducers/categoriesSlice";

const CategoriesList = () => {
  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, []);

  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(
    (state: RootState) => state.categories
  );

  if (!data) {
    return <p>Not found</p>;
  }

  if (isLoading) {
    return <Skeleton height={120} width={200} />;
  }

  return (
    <Grid spacing={2} container>
      {data.map((item: any) => (
        <Grid key={item._id} item md={4}>
          <CategoryItem _id={item._id} title={item.title} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoriesList;
