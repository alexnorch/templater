import { createTheme } from "@mui/material";
import { indigo, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: indigo[600],
      dark: indigo[700],
    },
    secondary: {
      main: grey[900],
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "0.2rem",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
