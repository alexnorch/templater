import { Stack, Box } from "@mui/material";
import CategoryItem from "./CategoryItem";

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
