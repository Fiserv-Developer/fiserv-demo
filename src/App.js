import { Alert, Box, CssBaseline, Snackbar } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Body from "./Components/Body";
import Menu from "./Components/Menu";
import { dark, light } from "./Config/themes";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


function App() {
  const [themeToggle, setThemeToggle] = useState(true); // false is dark, true is light
  const theme = createTheme(themeToggle ? light : dark);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CssBaseline />
        <BrowserRouter>
          <Box sx={{ display: 'flex' }}>
            <Menu themeToggle={themeToggle} setThemeToggle={setThemeToggle} />
            <Body setSnackbarOpen={setSnackbarOpen} setSnackbarText={setSnackbarText} />
          </Box>
        </BrowserRouter>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" color="primary" sx={{ width: '100%' }}>
              {snackbarText}
            </Alert>
        </Snackbar>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
