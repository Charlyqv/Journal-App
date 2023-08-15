import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const grayTheme = createTheme({
  palette: {
    primary: {
      main: '#393D42'
    },
    secondary: {
      main: '#5B5B5B'
    },
    error: {
      main: red.A400
    }
  }
});