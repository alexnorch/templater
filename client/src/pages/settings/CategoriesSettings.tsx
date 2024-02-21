import { Typography } from "@mui/material";
import { CategoriesList, CategoryAdd } from "../../components/categories";

const CategoriesSettings = () => {
  return (
    <>
      <Typography variant="h5" mb={2}>
        My Categories
      </Typography>
      <CategoriesList />
      <CategoryAdd />
    </>
  );
};

export default CategoriesSettings;
