import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface LogoProps {
  component?: any;
  variant?: any;
}

const linkStyles = {
  color: "inherit",
  textDecoration: "none",
};

const Logo: React.FC<LogoProps> = ({ variant, component }) => {
  return (
    <Link style={linkStyles} to="/">
      <Typography
        variant={variant}
        noWrap
        component={component}
        sx={{ letterSpacing: ".2rem" }}
      >
        Templater
      </Typography>
    </Link>
  );
};

export default Logo;
