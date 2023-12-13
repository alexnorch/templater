import CategoryItem from "./CategoryItem";
import { Stack, Box, Typography, Divider } from "@mui/material";
import CategoryAdd from "./CategoryAdd";

const tempCategory = ["Bonuses", "Verification", "Tech issues", "Tickets"];

const CategoriesList = () => {
  return (
    <Box>
      <Stack
        flexDirection="column"
        alignItems="space-between"
        justifyContent="center"
        spacing={1}
      >
        {tempCategory.map((item, index) => (
          <CategoryItem key={index} title={item} />
        ))}
      </Stack>
    </Box>
  );
};

export default CategoriesList;
