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
        root: ({ ownerState }) => ({
          borderRadius: "0.2rem",
          textTransform: "none",
          ...(ownerState.variant === "outlined" && {
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
            },
          }),
        }),
      },
    },
  },
});

export default theme;
