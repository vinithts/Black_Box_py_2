import { createTheme } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontFamily: "Roboto, sans-serif",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontFamily: "Roboto, sans-serif",
        },
      },
    },
  },
});
export { theme };
