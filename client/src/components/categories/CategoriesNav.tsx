import { NavLink } from "react-router-dom";
import { Stack, Box } from "@mui/material";

const tempCategory = ["Bonuses", "Verification", "Tech issues", "Tickets"];

const CategoriesNav = () => {
  return (
    <Stack alignItems="" flexWrap="wrap" direction="row" spacing={1}>
      <CategoryNavItem title="All" />
      {tempCategory.map((cat) => (
        <CategoryNavItem title={cat} />
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
