import { Typography, Box } from "@mui/material";
import { CategoriesList, CategoryAdd } from "../../components/categories";

const CategoriesSettings = () => {
  return (
    <Box component="section">
      <Typography component="h2" variant="h4">
        Categories
      </Typography>
      <CategoriesList />
      <CategoryAdd />
    </Box>
  );
};

export default CategoriesSettings;
