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
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      TemplateCraft
    </Typography>
  );
};

export default Logo;
