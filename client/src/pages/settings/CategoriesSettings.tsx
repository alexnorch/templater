import { Typography, Box } from "@mui/material";
import CategoriesList from "../../components/categories/CategoriesList";
import CategoryAdd from "../../components/categories/CategoryAdd";

const CategoriesSettings = () => {
  return (
    <Box component="section">
      <Box mb={2}>
        <Typography component="h2" variant="h4">
          Categories
        </Typography>
        <Typography component="p" variant="subtitle1">
          Here you can adjust your categories
        </Typography>
      </Box>
      <CategoriesList />
      <CategoryAdd />
    </Box>
  );
};

export default CategoriesSettings;
