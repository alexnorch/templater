import { Typography, Stack } from "@mui/material";
import { CategoriesList, CategoryAdd } from "../../components/categories";
import { CustomTooltip } from "../../components/ui";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const categoriesTooltip =
  `Categories help organize templates. If you plan to 
   maintain many templates, creating categories is advisable. 
   There are no limits to the number of categories you can create`;

const CategoriesSettings: React.FC = () => {
  return (
    <>
      <Stack flexDirection="row" gap={1} alignItems="center" mb={2}>
        <Typography variant="h5">My Categories</Typography>
        <CustomTooltip title={categoriesTooltip}>
          <InfoOutlinedIcon />
        </CustomTooltip>
      </Stack>

      <CategoriesList />
      <CategoryAdd />
    </>
  );
};

export default CategoriesSettings;
