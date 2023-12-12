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
    <Box sx={{ cursor: "pointer" }} onClick={onNavigate}>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
    </Box>
  );
};

export default CategoryItem;
