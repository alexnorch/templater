import { NavLink } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const CategoriesNav = () => {
  const { categories } = useSelector((state: RootState) => state.category);

  return (
    <Stack alignItems="" flexWrap="wrap" direction="row" spacing={1}>
      <CategoryNavItem title="All" />
      {categories.map((category: any) => (
        <CategoryNavItem
          key={category._id}
          title={capitalizeFirstLetter(category.title)}
        />
      ))}
    </Stack>
  );
};

const CategoryNavItem: React.FC<{ title: string }> = ({ title }) => {
  const linkStyle = {
    textDecoration: "none",
    color: "gray",
    fontSize: 18,
  };

  return (
    <Box sx={{ listStyle: "none" }} component="li">
      <NavLink
        style={({ isActive }) => {
          return {
            ...linkStyle,
            color: isActive ? "#333" : "gray",
          };
        }}
        to={
          title === "All"
            ? "/templates"
            : `/templates/${encodeURIComponent(title)}`
        }
        end
      >
        {title}
      </NavLink>
    </Box>
  );
};

export default CategoriesNav;
