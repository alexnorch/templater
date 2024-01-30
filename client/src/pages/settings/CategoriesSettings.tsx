import { Typography, Box } from "@mui/material";
import CategoriesList from "../../components/categories/CategoriesList";
import CategoryAdd from "../../components/categories/CategoryAdd";

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
