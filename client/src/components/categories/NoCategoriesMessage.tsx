import { Alert } from "@mui/material";
import { Link } from "react-router-dom";

const NoCategoriesMessage: React.FC = () => {
  return (
    <Alert severity="info">
      In order to create a template, start by making your first category. Simply
      go to <Link to="/settings/categories">Settings</Link> and create your
      initial template category.
    </Alert>
  );
};

export default NoCategoriesMessage;
