import { Typography } from "@mui/material";

interface LogoProps {
  component?: any;
  variant?: any;
}

const Logo: React.FC<LogoProps> = ({ variant, component }) => {
  return (
    <Typography
      variant={variant}
      noWrap
      component={component}
      href="#app-bar-with-responsive-menu"
      sx={{
        mr: 2,
        fontFamily: "Sans-Serif",
        fontWeight: 400,
        letterSpacing: ".2rem",
        color: "inherit",
        textDecoration: "none",
        fontSize: 18,
      }}
    >
      Templater
    </Typography>
  );
};

export default Logo;
