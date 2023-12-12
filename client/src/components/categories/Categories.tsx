import CategoriesList from "./CategoriesList";
import { Stack, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Categories = () => {
  const containerStyles = {
    backgroundColor: "#08aeea",
    backgroundImage: "linear-gradient(180deg, #0794c8 0%, #8fc4ac 100%)",
  };

  return (
    <Stack
      spacing={5}
      py={4}
      flexWrap="wrap"
      alignItems="center"
      direction="row"
      justifyContent="center"
      sx={containerStyles}
    >
      <CategoriesList />
      <Fab>
        <AddIcon />
      </Fab>
    </Stack>
  );
};

export default Categories;
