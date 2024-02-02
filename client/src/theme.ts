import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: indigo[600],
      dark: indigo[700],
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
        },
      },
    },
  },
});

export default theme;
