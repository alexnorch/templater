import CategoryItem from "./CategoryItem";
import { Stack } from "@mui/material";

const CategoriesList = () => {
  return (
    <Stack alignItems="" flexWrap="wrap" direction="row" spacing={2}>
      <CategoryItem
        title="Bonuses"
        icon="https://upload.wikimedia.org/wikipedia/commons/1/14/Dollar_Sign.svg"
      />
      <CategoryItem
        title="KYC"
        icon="https://cdn-icons-png.flaticon.com/512/7355/7355471.png"
      />
      <CategoryItem
        title="Withdraw "
        icon="https://cdn-icons-png.flaticon.com/512/6360/6360731.png"
      />
    </Stack>
  );
};

export default CategoriesList;
