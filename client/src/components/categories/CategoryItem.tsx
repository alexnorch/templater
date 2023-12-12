import { Box, Stack, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

interface ICategoriesItem {
  title: string;
  icon: string;
}

const CategoryItem: React.FC<ICategoriesItem> = ({ icon, title }) => {
  const navigate = useNavigate();

  const onNavigate = () => navigate(`/${title}`);

  return (
    <Stack
      sx={{ cursor: "pointer", maxWidth: 150 }}
      spacing={1}
      justifyContent="center"
      alignItems="center"
      onClick={onNavigate}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          height: 80,
          width: 80,
          backgroundColor: "#eee",
          borderRadius: 50,
        }}
      >
        <Box sx={{ maxWidth: "50%" }} component="img" src={icon} />
      </Stack>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
    </Stack>
  );
};

export default CategoryItem;
