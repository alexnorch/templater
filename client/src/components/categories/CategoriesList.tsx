import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Stack, Box } from "@mui/material";
import CategoryItem from "./CategoryItem";

const CategoriesList = () => {
  const { categories } = useSelector((state: RootState) => state.category);
  return (
    <Box>
      <Stack
        flexDirection="column"
        alignItems="space-between"
        justifyContent="center"
        spacing={1}
      >
        {categories.map((item) => (
          <CategoryItem key={item._id} title={item.title} />
        ))}
      </Stack>
    </Box>
  );
};

export default CategoriesList;
